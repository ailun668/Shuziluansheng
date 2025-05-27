function getHtml($dom) {
    const html = $dom?.innerHTML;
    // 新建一个 DOM
    const div = document.createElement("div");
    const printDOMID = "printDOMElement";
    div.id = printDOMID;
    div.innerHTML = html;

    // 提取第一个表格的内容 即表头
    const ths = div.querySelectorAll(".el-table__header-wrapper th");
    const ThsTextArry = [];
    for (let i = 0, len = ths.length; i < len; i++) {
        if (ths[i].innerText !== "") ThsTextArry.push(ths[i].innerText);
    }

    // 删除多余的表头
    div.querySelector(".hidden-columns").remove();
    // 第一个表格的内容提取出来后已经没用了 删掉
    div.querySelector(".el-table__header-wrapper").remove();

    // 将第一个表格的内容插入到第二个表格
    let newHTML = "<tr>";
    for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML +=
            '<td style="text-align: center; font-weight: bold">' +
            ThsTextArry[i] +
            "</td>";
    }

    newHTML += "</tr>";
    div?.querySelector(".el-table__body-wrapper table")?.insertAdjacentHTML(
        "afterbegin",
        newHTML
    );

    return div?.querySelector(".el-table__body-wrapper table")?.parentElement
        ?.innerHTML;
}

export default function print($dom) {
    const printElementHtml = getHtml($dom);
    // 创建iframe元素
    const iframe = document.createElement("iframe");
    iframe.setAttribute("style", "display:none");
    iframe.style.width = "220mm";
    iframe.style.height = "500px";
    document.body.appendChild(iframe);
    let doc = iframe.contentWindow.document;

    // 写入html
    doc.write(`
<html>
<head>
<style>
  /* 添加打印样式，保留el-table的边框 */
  .el-table__body {

  }
  
  .el-table__row {
    text-align:center;
  }
  
  .el-table__cell {
    border: 1px solid #000;
    padding: 5px;
  }

  .el-table__cell .cell {
    word-break: break-all;
  }

  .hidden-columns,
  .hide-in-print {
    display: none !important;
  }

  tr,
  td,
  .cell,
  .el-table__row,
  .el-table__cell {
    page-break-inside: avoid !important;
  }

</style>
</head>
<body>
<div class="table-wrap">
${printElementHtml}
</div>
</body>
</html>
`);
    doc.close();

    // 调用打印
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    // 打印完毕后移除
    iframe.parentNode.removeChild(iframe);
}
