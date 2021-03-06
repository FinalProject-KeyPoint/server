

const excludedWord = [
    'kami', 'saya', 'dia', 'akan', 'nanti', 'yang', 'yaitu',
    'dan', 'atau', 'di', 'kita', 'dari', 'lalu', 'untuk',
    'ada', 'sejak', 'baik', 'belum', 'itu', 'ke', 'oleh',
    'pada', 'saat', 'bahkan', 'and', 'dan'
]
// before update
// const excludedWord = [
//     'kami', 'saya', 'dia', 'akan', 'nanti', 'yang', 'yaitu',
//     'dan', 'atau', 'di', 'kita', 'dari', 'lalu', 'untuk',
//     'ada'
// ]

function removeExcludedWord ( textString ){
    console.log(`\n\n\nTCL: removeExcludedWord -> textString\n=================\n`, textString)
    const jointExcludedWord = excludedWord.join('|')
    
    return textString.replace(new RegExp('\\b(' + jointExcludedWord + ')\\b', 'gi'), ' ')
                    .replace(/\s{2,}/g, ' ') //ilangin multi space
                    .replace(/[^\w\s]/gi, '') //ilangin special char
                    .replace(/\s+/g,' ') //ilangin space
                    .trim() //ilangin leading space
                    .split('splitter1')
}




module.exports = ( originalText )=>{
    const minimumMatch = 30
    // console.log(`\n\n\nTCL: originalText\n=================\n`, originalText)

    const fullText = removeExcludedWord( originalText.join('splitter1').replace(/\n/gi).toLowerCase() ) //pake yang ini
    // fullText = removeExcludedWord( testText.join('splitter1') ) //nanti dicomment
    // console.log(`\n\n\n\n\nTCL: fullText\n=================\n`, fullText)


    const redactedFullTextArray = []
    for (let x = 0; x < fullText.length-1; x++)
    {

        console.log(`TCL: x`, x)
        // buat initial baseText object dengan unique key
        const initialBaseFullText = fullText[x].replace(/(\b\S.+\b)(?=.*\1)/g, '').trim()
        console.log(`TCL: initialBaseFullText`, initialBaseFullText)

        const initialBaseTextArray = initialBaseFullText.split(' ').filter( v => v != '' )
        console.log(`TCL: initialBaseTextArray`, initialBaseTextArray)
        console.log(`TCL: initialBaseTextArray.length`, initialBaseTextArray.length)
        

        let initialBaseTextObject = {}
        initialBaseTextArray.forEach(element => {
            initialBaseTextObject[ element ] = 1
        });
        console.log(`TCL: initialBaseTextObject`, initialBaseTextObject)


        // compare to all the rest of the array
        let uniqueStatus = true
        for( let y = x+1; y < x+2; y++)
        {
            console.log(`TCL: x`, x)
            console.log(`TCL: y`, y)
            console.log(`TCL: fullText[y]`, fullText[y])
            let duplicatedWord = {}
            for( key in initialBaseTextObject )
            {
                const regDuplicate = new RegExp( key, 'gi')
                const duplicateCount = ( fullText[y].match( regDuplicate ) || [] ).length
                if( duplicateCount > 0 )
                    duplicatedWord[key] = duplicateCount
            }
            console.log(`TCL: duplicatedWord`, duplicatedWord)




            // registering the index of to-be-deleted array which is of shorter length between 
            const duplicateKey = Object.keys(duplicatedWord)
            if( duplicateKey.length > 0)
            {
                const percentage = Math.round(( duplicateKey.length / initialBaseTextArray.length ) * 100)
                console.log(`TCL: duplicateKey.length`, duplicateKey.length)
                console.log(`TCL: duplicate percentage`, percentage)

                if(percentage > minimumMatch)
                {
                    uniqueStatus = false
                    console.log('\n======================\n ini yang bakal dipush dalam array')
                    if( initialBaseFullText.length > fullText[y].length)  
                    {
                        redactedFullTextArray.push(originalText[x])
                        console.log(`TCL: originalText[x]`, originalText[x])
                    }
                    else
                    {
                        redactedFullTextArray.push(originalText[y])
                        console.log(`TCL: originalText[y]`, originalText[y])
                    }
                    x +=1
                    break
                }
            }
        }
        
        console.log(`TCL: uniqueStatus`, uniqueStatus)
        console.log(' \n\n\n======================\n x sekarang', x)
        if(uniqueStatus)
            redactedFullTextArray.push(originalText[x])

        if(x === fullText.length-2)
            redactedFullTextArray.push(originalText[x+1])
        
            
        console.log('=========================================\n\n\n\n\n')
    }

    console.log(`TCL: redactedFullTextArray`, redactedFullTextArray)
    return redactedFullTextArray
}