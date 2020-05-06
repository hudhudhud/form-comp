/*
params:
    imgFiles:文件列表，file类型，
    imgEles:图片元素，img元素，
    maxSize:文件需要压缩的大小，默认2兆，即超过2兆需要压缩
    ios照片方向问题，参考链接：https://segmentfault.com/a/1190000011616874
return:promise数组，压缩后的文件数组
*/
export function imgCompression(imgFiles,imgEles,maxSize=2){
    let promiseArray = imgFiles.map((imgFile,index)=>{
        return new Promise((resolve,reject)=>{
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            //用于解决ios上传竖屏图片被旋转90度问题,获取图片的拍摄角度
            let Orientation=''
            EXIF.getData(imgEles[index],  function() {   //Orientation返回的参数 1 、3 、6 、8
                Orientation = EXIF.getTag(this, 'Orientation');   
                return Orientation                   
            }); 
            
            let image = new Image();
            image.onload = function() {
                let radio= 1
                let maxWidth = 1080/2
                let maxHeight = 1440/2
                if(imgFile.size>maxSize*1024*1024){
                    let scale=1
                    // radio= this.naturalWidth/this.naturalHeight
                    // if(this.naturalWidth>maxWidth){
                    //     canvas.width = maxWidth;
                    //     canvas.height = maxWidth/radio;
                    // }
                    // else if(this.naturalHeight>maxHeight){
                    //     canvas.height = maxHeight;
                    //     canvas.width = maxHeight*radio;
                    // }
                    // context.drawImage(this,0,0,canvas.width,canvas.height);

                    if(this.naturalWidth>maxWidth){
                        scale = maxWidth/this.naturalWidth;
                    }
                    else if(this.naturalHeight>maxHeight){
                        scale = maxHeight/this.naturalHeight;
                    }

                    //用于解决ios上传竖屏图片被旋转90度问题
                    if(Orientation && Orientation != 1){
                        switch(Orientation){
                            case 6:     // 旋转90度
                                canvas.width = this.naturalHeight * scale;
                                canvas.height = this.naturalWidth * scale;
                                context.rotate(Math.PI / 2);
                                // (0,-imgHeight) 从旋转原理图那里获得的起始点
                                context.drawImage(this, 0,-this.naturalHeight * scale,  this.naturalWidth * scale, this.naturalHeight * scale);
                                break;
                            case 3:     // 旋转180度
                                canvas.width = this.naturalWidth * scale;
                                canvas.height = this.naturalHeight * scale;
                                context.rotate(Math.PI);
                                context.drawImage(this, -this.naturalWidth * scale, -this.naturalHeight * scale, this.naturalWidth * scale, this.naturalHeight * scale)
                                break;
                            case 8:     // 旋转-90度
                                canvas.width = this.naturalHeight * scale;
                                canvas.height = this.naturalWidth * scale;
                                context.rotate(3 * Math.PI / 2);
                                context.drawImage(this, - this.naturalWidth * scale, 0,  this.naturalWidth * scale, this.naturalHeight * scale);
                                break;
                        }
                    }else{
                        radio= this.naturalWidth/this.naturalHeight
                        if(this.naturalWidth>maxWidth){
                            canvas.width = maxWidth;
                            canvas.height = maxWidth/radio;
                        }
                        else if(this.naturalHeight>maxHeight){
                            canvas.height = maxHeight;
                            canvas.width = maxHeight*radio;
                        }
                        context.drawImage(this,0,0,canvas.width,canvas.height);
                    }

                   // alert("width:"+this.naturalWidth+";height:"+this.naturalHeight+";newW:"+canvas.width+";newH:"+canvas.height+";Orientation:"+Orientation)            
                    let cutAvater=canvas.toDataURL()
                    
                    // let img =document.createElement('img')
                    // img.src=cutAvater
                    // document.body.appendChild(img)

                    let arr = cutAvater.split(',')
                    let data = window.atob(arr[1])
                    let mime = arr[0].match(/:(.*?);/)[1]
                    let ia = new Uint8Array(data.length)
                    for (var i = 0; i < data.length; i++) {
                        ia[i] = data.charCodeAt(i)
                    }
                    let blob = new Blob([ia], {type: mime})
                    let file = new window.File([blob], imgFile.name, {type: imgFile.type})
                    resolve(file)
                }
                else{
                    resolve(imgFile)
                }
            };
            image.src = window.URL.createObjectURL(imgFile);
        })
        .catch(()=>{
            resolve(imgFile)
        })
    })
    return  Promise.all(promiseArray)
}
