const tableList = document.querySelector("#product-list");

export const render = (data) => {

    tableList.innerHTML = '';


    const thead = document.createElement('thead')
    thead.innerHTML = `
    
    <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Nombre
          </th>
          <th>
            Precio
          </th>
          <th>
            Foto
          </th>
        </tr>
      </thead>
      
    `

    tableList.appendChild(thead)
    tableList.appendChild(renderList(data));
}



const renderList = (products) => {

    let body = document.createElement('tbody');
    

    for (let item of products) {
        let tr = document.createElement('tr')
        tr.innerHTML += `
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.thumbnail}</td>
        `;

        body.appendChild(tr);
    }

    return body;

}