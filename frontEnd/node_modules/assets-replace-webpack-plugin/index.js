const fs = require('fs')
const path = require('path')
class AssetsReplacePlugin {
	constructor(options) {
		this.options = options
	}

	apply(compiler) {
		const self = this
		const {options} = this
		compiler.hooks.emit.tapAsync('AssetsReplacePluginEmit',function(compilation,callback) {
			if (!options || !Array.isArray(options)) {
				callback()
				return
			}
			const emitList = []
			for(let filename in compilation.assets) {
				if (/\.(js|css)$/.test(filename)) {
					emitList.push(path.parse(filename).base)
				}
			}
			let completeIndex = 0
			for (let i = 0; i < options.length; i++) {
				const fName = options[i]
				fs.readFile(fName, 'utf-8', function(err, data) {
					if (err) {
						throw err
					}	
					const newContent = self.replaceAssets(data, emitList)
					fs.writeFile(fName, newContent, function(err) {
						if (err) {
							throw err
						}
						completeIndex++
						if (completeIndex === options.length) {
							callback()
						}
					})
				})
			}
		})
	}

	replaceAssets(content, assets) {
		for (let i = 0; i < assets.length; i++) {
			const fileName = assets[i]
			const regExp = this.createReg(fileName)
			content = content.replace(regExp, fileName)
		}
		return content
	}

	createReg(fName) {
		const reg = /\.[a-zA-Z0-9]+(?=\.)/g
		const replaceReg = new RegExp(fName.replace(reg,'\\.[a-zA-Z0-9]+'),'g')
		return replaceReg
	}
}

module.exports = AssetsReplacePlugin