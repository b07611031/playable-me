import {readFileSync} from 'node:fs'
import assert from 'node:assert/strict'
const characters=JSON.parse(readFileSync(new URL('../src/characters.json',import.meta.url),'utf8'))
const app=readFileSync(new URL('../src/App.tsx',import.meta.url),'utf8')
const ids=new Set()
const groups={builder:[],learner:[],gamer:[]}
const expected={
 builder:['plantman','sam','workflow'],
 learner:['water','arena','camino'],
 gamer:['spaceship','pyke','cs']
}
assert.equal(characters.length,9,'Exactly nine identities are required')
for(const role of characters){
 assert.ok(!ids.has(role.id),'Duplicate character id: '+role.id)
 ids.add(role.id)
 assert.ok(role.group in groups,'Unknown group: '+role.group)
 groups[role.group].push(role)
 for(const field of ['name','classTag','intro','skill','evidence','takeaway','detail']){
  assert.ok(role[field]?.en?.trim()&&role[field]?.zh?.trim(),'Missing EN/ZH: '+role.id+'/'+field)
 }
 assert.ok(role.costume&&role.symbol)
 assert.ok(app.includes(`id:'${role.storyId}'`),'Referenced story does not exist in App: '+role.storyId)
 assert.ok(expected[role.group].includes(role.storyId),'Wrong story mapping: '+role.storyId)
 assert.equal(role.unlock.kind,{builder:'lab',learner:'outfit',gamer:'game'}[role.group])
 assert.ok([1,2,3].includes(role.unlock.level),'Invalid milestone level')
}
for(const group of Object.keys(groups)){
 assert.equal(groups[group].length,3,'Three identities required for '+group)
 assert.deepEqual(groups[group].map(r=>r.unlock.level),[1,2,3],'Milestones must match story order for '+group)
 assert.deepEqual(new Set(groups[group].map(r=>r.storyId)),new Set(expected[group]),'Story mappings not one-to-one for '+group)
}
const space=readFileSync(new URL('../src/SpaceQuest.tsx',import.meta.url),'utf8')
assert.ok(space.includes('avoided>=5?2:avoided>=2?1:0'),'Missing 2/5 dodge tier rules')
assert.ok(space.includes('onMilestone(3)'),'Missing completion-tier award')
console.log('YUN CODEX OK: 9 unique bilingual roles, 3 categories, 9 existing stories and correct unlock sources.')
