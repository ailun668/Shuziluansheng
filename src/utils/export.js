import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}

export function exportTableAsXlsx(table, titleNum) {
  console.error(table)
  // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
  const xlsxParam = { raw: true }
  // let table = document.getElementById(targetID).cloneNode(true);
  // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
  if (table.querySelector('.el-table__fixed-right')) {
    table.removeChild(table.querySelector('.el-table__fixed-right'))
  }
  if (table.querySelector('.el-table__fixed')) {
    table.removeChild(table.querySelector('.el-table__fixed'))
  }

  const wb = XLSX.utils.table_to_book(table, xlsxParam)
  let range = XLSX.utils.decode_range(wb.Sheets['Sheet1']['!ref'])
  let cWidth = []
  for (let C = range.s.c; C <= range.e.c; ++C) {
    let len = 50 // 默认列宽
    let len_max = 300 // 最大列宽
    for (let R = range.s.r; R <= range.e.r; ++R) {
      let cell = { c: C, r: R }
      let cell_ref = XLSX.utils.encode_cell(cell)
      if (wb.Sheets['Sheet1'][cell_ref]) {
        // ...
        let va = JSON.parse(JSON.stringify(wb.Sheets['Sheet1'][cell_ref].v))
        var card1 = JSON.parse(JSON.stringify(va)).match(/[\u4e00-\u9fa5]/g)
        var card11 = ''
        if (card1) {
          card11 = card1.join('')
        }
        var card2 = JSON.parse(JSON.stringify(va)).replace(/([^\u0000-\u00FF])/g, '')
        let st = 0
        if (card11) {
          st += card11.length * 20
        }
        if (card2) {
          st += card2.length * 10
        }
        if (st > len) {
          len = st
        }
      }
    }
    if (len > len_max) {
      len = len_max
    }
    cWidth.push({ wpx: len })
  }
  wb.Sheets['Sheet1']['!cols'] = cWidth
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  })
  try {
    // const fileName = +new Date();
    const fileName = titleNum
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: '' }), `${fileName}.xlsx`)
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout)
    }
  }
  return wbout
}

// export function exportTableAsXlsx(targetID) {
//     let wb = XLSX.utils.table_to_book(document.getElementById(targetID), {
//         sheet: "Sheet1",
//         style: {
//             cellStyles: true,
//             cellStyle: {
//                 alignment: {
//                     horizontal: "center",
//                 },
//             },
//         },
//     });
//     let wbout = XLSX.write(wb, {
//         bookType: "xlsx",
//         bookSST: true,
//         type: "array",
//     });
//     try {
//         const tempName = +new Date();
//         FileSaver.saveAs(
//             //被导出的blob二进制对象
//             new Blob([wbout], { type: "application/octet-stream" }),
//             //导出文件的名称+后缀名
//             `${tempName}-SangoAI.xlsx`
//         );
//     } catch (e) {
//         if (typeof console != "undefined") console.log(e, wbout);
//     }
// }

// 根据dom导出表格
