import React from 'react'
import { getUser } from "../services/auth"

class Requests extends React.Component {
    

    state = {
        selectAll : false,
        checkBoxes : [],
        sendRequest : false,
        filterStr : "",
        fetchedData : [], 
        loading : true,
        fetchedStorage: [],
        storageLoading : true,
        fetchedStaff : [],
        loadingStaff : true,
        selectedStorage : "none",
        selectedProduct : "none",
        fetchedProduct : [],
        loadingProduct : true
    }


    componentDidMount() {
        // let temp = new Array(this.requests.length).fill(false)
        // this.setState({ checkBoxes : temp, filteredRequests : this.requests })
    }

    checkState() {
        this.setState({ selectAll : true })
        this.state.checkBoxes.forEach( checkBox => {
            if(checkBox === false)
                this.setState({ selectAll : false })
        })
    }

    getStatus(elem) {
        let temp = this.state.checkBoxes
        temp[elem.currentTarget.id] = !this.state.checkBoxes[elem.currentTarget.id]
        this.setState({ checkBoxes : temp })
        elem.currentTarget.checked = this.state.checkBoxes[elem.currentTarget.id]
        this.checkState()
    }

    checkAll() {
        if(this.state.selectAll === false){
            this.setState({ selectAll : true })
            let temp = new Array(this.state.checkBoxes.length).fill(true)
            this.setState({ checkBoxes : temp })
        } else {
            this.setState({ selectAll : false })
            let temp = new Array(this.state.checkBoxes.length).fill(false)
            this.setState({ checkBoxes : temp })
        }
    }

    newRequest() {
        let valid = true
        if(this.articleNumber === undefined || this.state.selectedStorage === "none" || this.state.selectedProduct === "none" || this.quantity.value.length === 0 || this.storage === undefined){
            alert("Заполните все поля")
            valid = false
        }
        this.state.fetchedStorage
            .filter(storage => storage.id === parseInt(this.state.selectedStorage))
            .map(
                storage => storage.productList
                    .filter(product => product.articleNumber === this.state.selectedProduct)
                    .map(product => parseInt(product.parameter1) < parseInt(this.quantity.value) ? (alert(`Максимальное количество: ${product.parameter1}`), valid = false) : valid = valid)
            )
        valid && fetch('https://crohe.herokuapp.com/api/request/new/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                "articleNumber": this.articleNumber.value,
                "fromPerson": getUser().id,
                "status" : "processing",
                "quantity" : this.quantity.value,
                "action" : "Принять",
                "storage" : this.state.fetchedStorage.find(storage => storage.id.toString() === this.storage.value)
            })
        })
        .then( response =>{
            if(response.ok){
                alert("Заявка добавлена")
                this.setState({
                    sendRequest : false,
                    loading : true,
                    selectedProduct : "none",
                    selectedStorage : "none"
                })
                return response.json();
            }
            alert("Ошибка")
        })
    }

    setStatus(id, status, storageId, articleNumber, quantity) {
        var valid = true
        if(status === "end" ) {
            this.state.loadingProduct && fetch(`https://crohe.herokuapp.com/api/product/list`, {
                method: 'get', 
            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    fetchedProduct : json.filter(product => product.storage.id === storageId).find(product => product.articleNumber === articleNumber),
                    loadingProduct : false
                }, () => {
                    if(parseInt(this.state.fetchedProduct.parameter1) < quantity) {
                        valid = false
                        alert("Товара недостаточно")
                        this.setState({
                            loading : true,
                            loadingProduct : true,
                            fetchedProduct : []
                        })
                    }
                    let newQuantity = parseInt(this.state.fetchedProduct.parameter1) - quantity
                    let body =
                        {
                            "id": this.state.fetchedProduct.id,
                            "articleNumber": this.state.fetchedProduct.articleNumber,
                            "name": this.state.fetchedProduct.name,
                            "parameter1":  newQuantity,
                            "priceBought": this.state.fetchedProduct.priceBought,
                            "priceSale": this.state.fetchedProduct.priceSale,
                            "parameter2": this.state.fetchedProduct.parameter2,
                            "storage": this.state.fetchedProduct.storage
                        }
                    valid && fetch(`https://crohe.herokuapp.com/api/product/update/${this.state.fetchedProduct.id}`, {
                        method: 'put',
                        headers: {'Content-Type':'application/json'},
                        mode: 'cors',
                        body : JSON.stringify(body)
                    })
                    .then( response =>{
                        if(response.ok){
                            fetch(`https://crohe.herokuapp.com/api/request/update/${id}/${status}`, {
                                method: 'put',
                                headers: {'Content-Type':'application/json'},
                                mode: 'cors'
                            })
                            .then( response =>{
                                if(response.ok){
                                    alert(`Статус заявки№${id} изменен`)
                                    this.setState({
                                        loading : true,
                                        loadingProduct : true,
                                        fetchedProduct : []
                                    })
                                    return response;
                                }
                                alert("Ошибка")
                            })
                            return response;
                        }
                        alert("Ошибка")
                    })
                })
            })
        } else {
            valid && fetch(`https://crohe.herokuapp.com/api/request/update/${id}/${status}`, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                mode: 'cors'
            })
            .then( response =>{
                if(response.ok){
                    alert(`Статус заявки№${id} изменен`)
                    this.setState({
                        loading : true
                    })
                    return response;
                }
                alert("Ошибка")
            })
        }
    }

    deleteRequest(id) {
        if(window.confirm('Вы уверены что хотите удалить заявку? После удаления ее невозможно восстановить')){
            var url = `https://crohe.herokuapp.com/api/request/delete/${id}`
            fetch(url, { 
                method: 'delete', 
            })
            .then( response =>{
                if(response.ok){
                    alert(`Заявка№${id} удалена`)
                    this.setState({
                        loading : true
                    })
                    return response;
                }
                alert("Ошибка")
            })
        } 
    }

	render(){
        
        var url = `https://crohe.herokuapp.com/api/request/list`
		this.state.loading && fetch(url, { 
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedData : json,
                loading : false
            })
        })

        this.state.storageLoading && fetch(`https://crohe.herokuapp.com/api/storage/list`, {
            method: 'get'
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedStorage: json,
                storageLoading : false
            })
        })

        var staffUrl = `https://crohe.herokuapp.com/api/staff/list`
		this.state.loading && fetch(staffUrl, { 
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedStaff: json,
                loadingStaff : false,
            })
        })


        const { filterStr } = this.state
        var filteredRequests = []
        if(this.state.fetchedData.length > 0){
            if(getUser().position === "SaleManager")
                filteredRequests = this.state.fetchedData
                    .filter(r => r.fromPerson === getUser().id.toString())
            if(getUser().position === "StorageManager")
                filteredRequests = this.state.fetchedData
                    .filter(r => r.storage.staff.id === getUser().id)
            if(getUser().position === "Admin")
                filteredRequests = this.state.fetchedData
            filteredRequests = filteredRequests
                .sort((a, b) => a.id > b.id ? 1 : -1)
                .filter(r => r.id.toString().includes(filterStr.toLowerCase()))
                .map((r, index) => <tr key={r.id}>
                    <td>
                        <label className="container-check">
                            <input id={index} onChange={(e) => this.getStatus(e)} checked={this.state.checkBoxes[index] || false} type="checkbox"></input>
                            <span className="checkmark"></span>
                        </label>
                    </td>
                    <td>
                        {r.date}
                    </td>
                    <td>
                        { r.id }
                    </td>
                    <td>
                        {
                            !this.state.loadingStaff && this.state.fetchedStaff
                                .filter(s => s.id.toString() === r.fromPerson)
                                .map(s => s.firstName + " " + s.lastName)
                        }
                    </td>
                    <td>
                        {r.storage.staff.firstName + " " + r.storage.staff.lastName}
                    </td>
                    <td>
                        {r.status === "processing" && "Обрабатывается"}
                        {r.status === "accepted" && "Принят"}
                        {r.status === "end" && "Завершен"}
                    </td>
                    <td>
                        {r.storage.name + " (id = " + r.storage.id + ")"}
                    </td>
                    <td>
                        {r.articleNumber}
                    </td>
                    <td>
                        {r.quantity}
                    </td>
                    {getUser().position.toLowerCase() !== "salemanager" && <td className='flex-row'>
                            {r.status === "processing" && <button onClick={() => this.setStatus(r.id, "accepted", r.storage.id, r.articleNumber, r.quantity)} className={`default-blue-button ${ getUser().position.toLowerCase() === "admin" && "col-6"}`}>Принять</button>}
                            {r.status === "accepted" && <button onClick={() => this.setStatus(r.id, "end", r.storage.id, r.articleNumber, r.quantity)}  className={`default-blue-button ${ getUser().position.toLowerCase() === "admin" && "col-6"}`}>Завершить</button>}
                            {r.status === "end" && <button className={`default-button ${ getUser().position.toLowerCase() === "admin" && "col-6"}`} disabled>Завершен</button>}
                            { getUser().position.toLowerCase() === "admin" && <button className='default-white-button' onClick={() => this.deleteRequest(r.id)}>Удалить</button>}
                        </td>
                    }
                </tr>)
        }
		return(
            <div className='sklad-page'>
                {this.state.sendRequest && <div onClick={() => this.setState({ sendRequest : false, selectedStorage : "none", selectedProduct : "none"  })} className='dark-bg'></div>}
                <div className='default-header'>
                    <div className='default-container' style={{height: `100%`}}>
                        <div className='flex-row'>
                            <div className='col-2 flex-item page-title'>
                                Заявки
                            </div>
                            <div className='col-5 flex-item'>
                                <form>
                                    <i>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                        </svg>
                                    </i>
                                    <input type={'text'} onChange={e => this.setState({ filterStr: e.target.value }) } name="search" id='search' placeholder='Поиск'></input>
                                </form>
                            </div>
                            <div className='col-5 flex-item flex-item-last'>
                                <p className='sklady-quantity'>{filteredRequests.length} заявки</p>
                                <button className='three-dots'>•••</button>
                                { getUser().position !== "StorageManager" && <button onClick={() => this.setState({  sendRequest : true })} className='new-sklad-button'>+ ОТПРАВИТЬ ЗАЯВКУ</button>}
                                <div className='three-dots-dropdown'>
                                    <span>

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='layout-div body-element default-content'>
                    <div className='default-container'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>
                                        <label className="container-check">
                                            <input onChange={() => this.checkAll()} checked={this.state.selectAll}  type="checkbox"></input>
                                            <span className="checkmark"></span>
                                        </label>
                                    </th>
                                    <th>
                                        дата заявки
                                    </th>
                                    <th>
                                        ID заявки
                                    </th>
                                    <th>
                                        от кого
                                    </th>
                                    <th>
                                        кому
                                    </th>
                                    <th>
                                        Статус
                                    </th>
                                    <th>
                                        Склад
                                    </th>
                                    <th>
                                        Артикуль
                                    </th>
                                    <th>
                                        Количество
                                    </th>
                                    { getUser().position !== "SaleManager" &&
                                        <th>
                                            Действие
                                        </th>
                                    }
                                </tr>
                                {filteredRequests}
                            </tbody>
                        </table>
                    </div>
                    

                    {
                        this.state.sendRequest && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ sendRequest : false, selectedStorage : "none", selectedProduct : "none" })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Новая заявка</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <select required ref={(ref) => {this.storage = ref}} value={this.state.selectedStorage} onChange={(e) => this.setState({ selectedStorage : e.currentTarget.value})} className='default-input'>
                                            <option value="none">Выберите склад</option>
                                            {this.state.fetchedStorage.map(storage => 
                                                <option key={storage.id} value={storage.id}>
                                                    {storage.name}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        {this.state.selectedStorage !== "none" && this.state.fetchedStorage
                                            .filter(storage => storage.id === parseInt(this.state.selectedStorage))
                                            .map((storage, index) => 
                                                <select key={index} required ref={(ref) => {this.articleNumber = ref}} value={this.state.selectedProduct} onChange={(e) => this.setState({ selectedProduct : e.currentTarget.value })}  className='default-input'>
                                                    <option value="none">Выберите продукт</option>
                                                    {storage.productList
                                                        .map(product => 
                                                            <option key={product.id} value={product.articleNumber}>
                                                                {product.articleNumber}
                                                            </option>    
                                                    )}
                                                </select>
                                        )}
                                    </div>
                                    <div>
                                        {
                                            this.state.selectedProduct !== "none" && this.state.fetchedStorage
                                                .filter(storage => storage.id === parseInt(this.state.selectedStorage))
                                                .map(
                                                    storage => storage.productList
                                                        .filter(product => product.articleNumber === this.state.selectedProduct)
                                                        .map(product => <input key={product.articleNumber} required ref={(ref) => {this.quantity = ref}} max={product.parameter1} className='default-input' type="number" min={1} placeholder={`Количество (максимум: ${product.parameter1})`}/>)
                                                )
                                        }
                                        {/* <input required ref={(ref) => {this.quantity = ref}} max={parseInt(this.state.selectedProduct)} className='default-input' type="number" min={1} placeholder="Количество"/> */}
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' type="button" onClick={() => this.newRequest()} value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ sendRequest : false, selectedStorage : "none", selectedProduct : "none" })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }

}

export default Requests