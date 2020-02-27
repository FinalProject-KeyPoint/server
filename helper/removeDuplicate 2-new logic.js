// const excludedWord = [
//     'kami', 'saya', 'dia', 'akan', 'nanti', 'yang', 'yaitu',
//     'dan', 'atau', 'di', 'kita', 'dari', 'lalu', 'untuk',
//     'ada', 'sejak', 'baik', 'belum', 'itu', 'ke', 'oleh',
//     'pada', 'saat', 'bahkan', 'and', 'dan'
// ]
const excludedWord = []


function removeExcludedWord ( textString ){
    console.log(`\n\n\nTCL: removeExcludedWord -> textString\n=================\n`, textString)
    const jointExcludedWord = excludedWord.join('|')
    
    return textString.replace(new RegExp('\\b(' + jointExcludedWord + ')\\b', 'gi'), ' ')
                    .replace(/\s{2,}/g, ' ') //ilangin multi space
                    // .replace(/[^\w\s]/gi, '') //ilangin special char
                    .replace(/[&\/\\#,+()$~%:*?<>{}]/gi, ' ')
                    .replace(/\s+/g,' ') //ilangin space
                    .trim() //ilangin leading space
                    .split('splitter1')
}


const paragraphToCompare = 1

module.exports = ( originalText )=>{
    let forTestCompare = []
    const minimumMatch = 60
    // console.log(`\n\n\nTCL: originalText\n=================\n`, originalText)

    //alternatif 1
    // const fullText = removeExcludedWord( originalText.join('splitter1').replace(/\n/gi).toLowerCase() ) //pake yang ini
    const fullText = removeExcludedWord( originalText.join('splitter1').replace(/\n/gi) )
    // const fullText = originalText
    console.log(`TCL: fullText`, fullText)
    
    // fullText = removeExcludedWord( testText.join('splitter1') ) //nanti dicomment
    // console.log(`\n\n\n\n\nTCL: fullText\n=================\n`, fullText)


    const redactedFullTextArray = []
    for (let x = 0; x < fullText.length-1; x++)
    {

        console.log(`TCL: x`, x)

        //split the first group
        const subArray = fullText[x].split('.').filter( e => e.length !== 0 )
        console.log(`TCL: subArray`, subArray)

        for(let x1=0; x1 < subArray.length; x1++)
        {
            console.log(' \n\n\n======================\n')
            console.log('x1=',x1,  `TCL: subArray[x1]`, subArray[x1])
            // buat initial baseText object dengan unique key
            const initialBaseFullText = subArray[x1].replace(/(\b\S.+\b)(?=.*\1)/g, '').trim()
            console.log(`TCL: initialBaseFullText`, initialBaseFullText)

            const initialBaseTextArray = initialBaseFullText.split(' ').filter( v => v != '' )
            console.log(`TCL: initialBaseTextArray`, initialBaseTextArray)
            console.log(`TCL: initialBaseTextArray.length`, initialBaseTextArray.length)


            let initialBaseTextObject = {}
            initialBaseTextArray.forEach(element => {
                initialBaseTextObject[ element ] = 1
            });
            console.log(`TCL: initialBaseTextObject`, initialBaseTextObject)

            

            //compare to next 'n' paragraph
            // let uniqueStatus = true
            for( let y = x+1; y < x+1+paragraphToCompare; y++ )
            {
                console.log(`TCL: x`, x)
                console.log(`TCL: y`, y)
                // console.log(`TCL: fullText[y]`, fullText[y])


                //split the next paragraph into sentences, than compare
                const subArrayCompare = fullText[y].split('.').filter( e => e.length !== 0 )
                
                for(let y1 =0; y1<subArrayCompare.length; y1++)
                    {
                        let duplicatedWord = {}
                        for( key in initialBaseTextObject )
                        {
                            const regDuplicate = new RegExp( key, 'gi')
                            const duplicateCount = ( subArrayCompare[y1].match( regDuplicate ) || [] ).length
                            if( duplicateCount > 0 )
                                duplicatedWord[key] = duplicateCount
                        }
                        console.log(`TCL: duplicatedWord`, duplicatedWord)

                        // removing the duplicate sentences. consideration is preference favor to the quote
                        const duplicateKey = Object.keys(duplicatedWord)
                        if( duplicateKey.length > 0)
                        {
                            const percentage = Math.round(( duplicateKey.length / initialBaseTextArray.length ) * 100)
                            console.log(`TCL: duplicateKey.length`, duplicateKey.length)
                            console.log(`TCL: duplicate percentage`, percentage)
                            
                            if(percentage >= minimumMatch)
                            {
                                forTestCompare.push( subArrayCompare[y1] )
                                if( subArrayCompare[y1].indexOf('\'') >= 0 || subArrayCompare[y1].indexOf('\"') >= 0 )
                                {
                                        console.log(' \n\nGANTI WOIIIIIII\n======================\n')
                                        subArrayCompare[y1] = '\"'
                                    }
                                else
                                {
                                        console.log(' \n\nSPLICE WOIII\n======================\n')
                                        subArrayCompare.splice( y1, 1)
                                }
                                
                                break
                            }
                        }
                };
                fullText[y] = subArrayCompare.join('. ')
                console.log(`TCL: fullText[y] sudah dijoin\n==========\n`, fullText[y])
            }
            
            // return
           
        }
        fullText[x] = subArray.join('. ')
        console.log(`TCL: fullText[x] sudah dijoin\n==========\n`, fullText[x])
        console.log('=========================================\n')
        console.log('=========================================\n')
        console.log('=========================================\n')
        
    }

    console.log(`TCL: fullText SETELAH PERMAK\n=====================\n\n`, fullText)
    console.log(`TCL: forTestCompare`, forTestCompare)
    return {fullText, forTestCompare}
    // console.log(`TCL: redactedFullTextArray`, redactedFullTextArray)
    // return redactedFullTextArray
}