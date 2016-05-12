/**
 * Created by Gong on 2016/5/12.
 */
(function () {
    'use strict'
    function g () {}

    g.clone = function (obj, isDeep) {
        if (!isDeep) {
            return _clone(obj)
        } else {
            return _deepClone(obj)
        }
    }

    let _clone = function (obj) {
        let newObj = null
        if (obj instanceof Array) {
            obj.forEach(function (item) {
                newObj.push(item)
            })
        } else {
            for (let key in obj) {
                newObj[key] = obj[key]
            }
        }

        return newObj
    }
    let _deepClone = function (obj) {
        let newObj = null

        if (obj instanceof Array) {
            newObj = []
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    newObj.push(_deepClone(obj[key]))
                } else {
                    newObj.push(obj[key])
                }
            }
        } else {
            newObj = {}
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    newObj[key] = _deepClone(obj[key])
                } else {
                    newObj[key] = obj[key]
                }
            }
        }

        return newObj
    }

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = g
    }
})()
