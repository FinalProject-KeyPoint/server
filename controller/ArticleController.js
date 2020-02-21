const Article = require('../model/Article')
const removeDuplicate = require('../helper/removeDuplicate')

class ArticleController{
    static test(req,res)
    {
        res.json({ message: 'Article Connected' })
    }

    static removeDuplicate(req,res,next)
    {
        console.log(' \n\n\n======================\n REMOVE DUPLICATE')
        // https://news.detik.com/berita/d-4907551/kpk-hentikan-penyelidikan-36-kasus-korupsi/1
        // https://news.detik.com/berita/d-4907551/kpk-hentikan-penyelidikan-36-kasus-korupsi/2

        const text1 ='Jakarta - KPK mengatakan telah menghentikan 36 perkara di tahap penyelidikan. KPK mengatakan penghentian perkara ini dilakukan penuh kehati-hatian dan bertanggung jawab.'
        const text2 = '"Komisi Pemberantasan Korupsi (KPK) mengkonfirmasi telah menghentikan 36 perkara di tahap Penyelidikan. Hal ini kami uraikan lebih lanjut sesuai dengan prinsip kepastian hukum, keterbukaan dan akuntabilitas pada publik sebagaimana diatur di Pasal 5 UU KPK," kata Plt Juru Bicara KPK Ali Fikri kepada wartawan, Kamis (20/2/2020).'
        const text3 = 'Ali terlebih dahulu menjelaskan definisi penyelidikan. Ali menyebutkan penyelidikan merupakan serangkaian kegiatan penyelidik untuk menemukan suatu peristiwa pidana untuk menentukan dapat atau tidaknya dilakukan penyidikan.'
        const text4 = '"Dari definisi penyelidikan ini kita dapat memahami bahwa dalam proses penyelidikan terdapat kemungkinan sebuah perkara ditingkatkan ke penyidikan atau tidak dapat dilanjutkan ke penyidikan. Ketika di tahap penyelidikan ditemukan peristiwa pidana dan bukti permulaan yang cukup, maka perkara ditingkatkan ke penyidikan. Dan, sebaliknya sebagai konsekuensi logis, jika tidak ditemukan hal tersebut maka perkara dihentikan penyelidikannya," ujarnya.'
        const text5 = 'Ali menegaskan penghentian kasus di tahap penyelidikan itu dilakukan dengan sejumlah pertimbangan.'
        const text6 = 'Berikut pertimbangan KPK dalam menghentikan kasus dalam tahap penyelidikan:'
        const text7 = 'Sejumlah penyelidikan sudah dilakukan sejak 2011 (9 tahun), 2013, 2015 dan lain lain.'
        const text7a = '-Selama proses penyelidikan dilakukan tidak terpenuhi syarat untuk ditingkatkan ke penyidikan, seperti: bukti permulaan yang cukup, bukan tindak pidana korupsi dan alasan lain yang dapat dipertanggungjawabkan secara hukum.'
        const text7b = '-Untuk tahun 2020, jenis penyelidikan yang dihentikan cukup beragam, yaitu terkait dugaan korupsi oleh kepala daerah, BUMN, aparat penegak hukum, kementerian/lembaga, dan DPR/D.'
        const text8 = `Ali mengatakan penghentian perkara dalam tahap penyelidikan bukan hal yang baru di KPK. Ali menyebut dalam kurun 5 tahun terakhir KPK sudah menghentikan penyelidikan kasus sebanyak 162 kasus.`
        const text9 = `"Perlu juga kami sampaikan, penghentian perkara di tingkat penyelidikan ini bukanlah praktik yang baru dilakukan saat ini saja di KPK. Data 5 tahun terakhir sejak 2016 KPK pernah menghentikan penyelidikan sebanyak total 162 kasus," sebut Ali.`
        const text10 = `Ali mengatakan penghentian kasus dalam tahap penyelidikan itu dulunya dilakukan karena dalam Pasal 40 UU Nomor 30 Tahun 2002 atau UU KPK sebelum revisi itu melarang KPK menghentikan penyidikan dan penuntutan. Karena itu, KPK saat itu wajib memastikan seluruh kasus yang naik ke penyidikan memiliki bukti yang kuat.`
        const text11 = `"Sama halnya dengan pasca berlakunya UU KPK yang baru. Meskipun UU Nomor 19 Tahun 2019 membuka ruang secara terbatas bagi KPK untuk menghentikan perkara di tingkat penyidikan dan penuntutan, namun KPK tetap wajib menangani perkara secara hati-hati. Pada Pasal 40 UU Nomor 19 Tahun 2019 penghentian penyidikan dapat dilakukan jika belum selesai dalam jangka waktu 2 tahun," kata Ali.`
        const text12 = `Karena itu, Ali mengatakan kasus-kasus yang memiliki bukti awal yang cukup wajib dilanjutkan. Namun sebaliknya, kasus yang dinilai tidak cukup bukti harus dihentikan.`
        const text13 = `"Sehingga, dalam proses penyelidikan lah kecukupan bukti awal diuji sedemikian rupa. Jika bukti cukup dapat ditingkatkan ke penyidikan, namun jika tidak cukup maka wajib dihentikan," tuturnya.`

        const fullTextArray = [ 
                                text1, text2, text3,
                                text4, text5, text6,
                                text7, text7a, text7b,
                                text8, text9, text10, 
                                text11, text12, text13
                            ]

        console.log(' \n\n\n======================\n', removeDuplicate(fullTextArray))
        res.status(200).json({ 
            originalArticle : fullTextArray,
            redactedArticle : removeDuplicate(fullTextArray) 
        })
    }

}


module.exports = ArticleController