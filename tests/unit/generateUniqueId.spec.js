const generateUniqueId = require('../../src/utils/generateUniqid')


describe('Generate Unique ID', ()=>{
    it('should generate as unique ID',()=>{
const id = generateUniqueId()

        expect(id).toHaveLength(8)
    })
})