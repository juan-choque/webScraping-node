const cheerio = require('cheerio')
const request = require('request-promise')
const fs = require('fs-extra')
const writeStream = fs.createWriteStream('quote.csv')


async function  init(){
  //const response = await request('https://quotes.toscrape.com/') como hacer una peticion sencilla
  const $ = await request({
    uri: 'https://quotes.toscrape.com/',
    transform: body => cheerio.load(body)
  })
  writeStream.write('Quote|Author|Tags\n')
  $('.quote').each((i,el)=>{
    const text = $(el).find('span.text').text().replace(/(^\“|\”$)/g,"")
    const author = $(el).find('span small.author').text()
    const tags = []
    const tag = $(el).find('.tags a').each((i,el) => tags.push($(el).text()))
    writeStream.write(`${text}|${author}|${tags}\n`)

  })
}

init()