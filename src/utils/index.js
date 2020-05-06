/**
 * 判断对象为空
 * @param v
 * @return {boolean}
 */
export const isEmpty = (v) => {
    if (typeof v === 'undefined') {
        return true
    }
    if (v === undefined || v === 'undefined') {
        return true
    }
    if (v === null) {
        return true
    }
    if (v === '' || v === 'null') {
        return true
    }
    switch (typeof v) {
        case 'string' :
            if (v.trim().length === 0) {
                return true
            }
            break
        case 'object' :
            return undefined !== v.length && v.length === 0
    }
    return false
}


export const storage = {
    get(key) {
        try {
            let t = window.localStorage.getItem(key)
            try {
                return JSON.parse(t)
            } catch (e) {
                return t
            }
        } catch (e) {
            console.log(e)
        }
    },
    set(key, val) {
        if (typeof val === 'object') {
            val = JSON.stringify(val)
        }
        window.localStorage.setItem(key, val)
    },
    clear(){
        window.localStorage.clear() 
    }
}

/**
 * 动态修改 document title
 * @param title
 * */
export const setDocumentTitle = (title) => {
    document.title = title || document.title
    let ifr = document.createElement('iframe')
    ifr.onload = function () {
        setTimeout(function () {
            ifr.remove()
        }, 0)
    }
    document.body.appendChild(ifr)
}
