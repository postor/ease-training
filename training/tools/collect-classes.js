#!/usr/bin/env node
const fs = require('fs-extra')
const { join } = require('path')
const { parseString } = require('xml2js')
const Counter = require('./Counter')

const sourceFolder = join(__dirname, '..', 'VOCLike', 'Annotations')

const files = fs.readdirSync(sourceFolder)
let all = new Counter()

for (let i = 0; i < files.length; i++) {
  let xmlName = files[i]
  if (!xmlName.endsWith('.xml')) continue
  parseString(fs.readFileSync(join(sourceFolder, xmlName)), (err, xml) => {
    if (err) {
      console.log(xmlName, err)
      return
    }

    try {
      xml.annotation.object.forEach(({ name }) => {
        all.add(name[0])
      })
    } catch (e) {
      console.log(xmlName, e)
    }
    // console.log(xmlName, JSON.stringify(xml))
  })
}

const classes = Object.keys(all.get())

fs.writeFileSync(join(__dirname, '..', 'classes.py'),
  `classesNames = [${classes.map(x => `'${x}'`).join(',')}]`)
console.log('write classes.py finish!')

