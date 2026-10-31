// Regression check for the current hand-authored Ocean Maze. No randomness is used.
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const source = readFileSync(new URL('../src/SharkMaze.tsx', import.meta.url),'utf8')
const mapBlock = source.match(/const MAP=\[([\s\S]*?)\]/)?.[1]
assert.ok(mapBlock, 'Missing Ocean Maze map')
const map = [...mapBlock.matchAll(/'([#.]+)'/g)].map(x=>x[1])
assert.equal(map.length,9,'Expected nine rows')
assert.ok(map.every(row=>row.length===11),'Map must be rectangular 11×9')
const start=[1,1], sharkStart=[7,9], treasures=[[1,9],[3,5],[7,1]]
const walkable=([r,c])=>map[r]?.[c]==='.'
const dirs=[[-1,0],[1,0],[0,-1],[0,1]]
const key=p=>p.join(',')
assert.ok([start,sharkStart,...treasures].every(walkable),'Spawn or collectibles embedded in a wall')
const shortest=(from,to)=>{
 const q=[[from,null]],seen=new Set([key(from)])
 for(let i=0;i<q.length;i++){
  const [p,first]=q[i]
  if(key(p)===key(to))return first??from
  for(const d of dirs){const next=[p[0]+d[0],p[1]+d[1]],k=key(next)
   if(!walkable(next)||seen.has(k))continue
   seen.add(k);q.push([next,first??next])}
 }
 return from
}
// State-space BFS simulates shark pursuit every two legal player moves,
// the three pickups, and collisions/lives. A winning path must exist.
const state=(p,s,mask,parity,hp,steps)=>({p,s,mask,parity,hp,steps})
const queue=[state(start,sharkStart,0,0,3,0)]
const seen=new Set()
let winning=null
for(let i=0;i<queue.length;i++){
 const v=queue[i],id=[key(v.p),key(v.s),v.mask,v.parity,v.hp].join('|')
 if(seen.has(id))continue
 seen.add(id)
 if(v.mask===7){winning=v;break}
 for(const [dr,dc] of dirs){
  const next=[v.p[0]+dr,v.p[1]+dc]
  if(!walkable(next))continue
  let mask=v.mask
  treasures.forEach((t,j)=>{if(key(t)===key(next))mask|=(1<<j)})
  const nextShark=v.parity===1?shortest(v.s,next):v.s
  const hit=key(nextShark)===key(next)
  const hp=v.hp-(hit?1:0)
  if(hp<1)continue
  queue.push(state(hit?start:next,hit?sharkStart:nextShark,mask,hit?0:1,hp,v.steps+1))
 }
}
assert.ok(winning,'Ocean Maze has no winning path with current shark pursuit rules')
console.log(`Ocean Maze OK: 11×9 fixed map, all 3 items reachable, winning route in ${winning.steps} moves; checked ${seen.size} states.`)
