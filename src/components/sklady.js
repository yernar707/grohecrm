import React from 'react'
import { getUser } from "../services/auth";

class Sklady extends React.Component {

    state = {
        selectAll : false,
        checkBoxes : [],
        changeSkladmen : false,
        addGood : false,
        addSklad : false,
        filterStr : "",
        currentSklad : [],
        showSklad : false,
        editSklad : false,
        filterGoods : "",
        goodId: '',
        fetchedData : [],
        loading: true,
        fetchedStaff: [],
        staffLoading : true,
        fetchedProduct: [],
        productLoading : true,
    }

    checkState() {
        this.setState({ selectAll : true })
        this.state.checkBoxes.forEach( checkBox => {
            if(checkBox === false)
                this.setState({ selectAll : false })
        })
    }

    getStatus(elem) {
        var temp = this.state.checkBoxes
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

    setCheckBoxes() {
        let len = 0
        if(this.state.currentSklad.length > 0)
            len = this.state.fetchedProduct.filter(s => s.storage.id === this.state.currentSklad[0].id).length
        let temp = new Array(len).fill(false)
        this.setState({ checkBoxes : temp })
    }

    newStorage() {
        let valid = true
        this.state.fetchedData.length > 0 && this.state.fetchedData.forEach(storage => {
            if(storage.name === this.storageName.value){
                valid = false
                alert("Склад с таким названием существует")
            }
        })
        valid && fetch('https://crohe.herokuapp.com/api/storage/new/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                "name": this.storageName.value,
                "address": this.storageAddress.value,
                "staff": this.state.fetchedStaff.find(manager => manager.id.toString() === this.storageManager.value)
            })
        })
        .then(
            alert(this.storageName.value + " добавлен")
        )
        .then(
            this.setState({
                addSklad : false,
                loading : true
            }),
            // window.location.reload()
        )
    }

    updateStorage(id) {
        let valid = true
        this.state.fetchedData.forEach(storage => {
            if(storage.id !== id && storage.name.toLowerCase() === this.storageNameUpdate.value.toLowerCase()){
                valid = false
                alert("Склад с таким названием существует")
            }
        })
        let body = {
            "name": this.storageNameUpdate.value,
            "address": this.storageAddressUpdate.value,
            "staff": this.state.fetchedStaff.find(manager => manager.id.toString() === this.storageManagerUpdate.value)
        }
        valid && fetch(`https://crohe.herokuapp.com/api/storage/update/${id}`, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify(body)
        })
        .then(
            alert(this.storageNameUpdate.value + " изменен")
        )
        .then(
            this.setState({
                currentSklad : [],
                editSklad : false,
                staffLoading : true
            }),
            // window.location.reload()
        )
    }

    deleteStorage(id) {
        if(window.confirm('Вы уверены что хотите удалить склад? После удаления его невозможно восстановить')){
            var url = `https://crohe.herokuapp.com/api/storage/delete/${id}`
            fetch(url, { 
                method: 'delete', 
            })
            .then(
                alert("Склад удален"),
                this.setState({ loading : true })
            )
        } 
    }

    newProduct() {
        let valid = true
        this.state.fetchedProduct.length > 0 && this.state.fetchedProduct.forEach(product => {
            if(product.articleNumber === this.productArticle.value){
                valid = false
                alert("Товар с таким артикулом существует")
            }
        })
        valid && fetch('https://crohe.herokuapp.com/api/product/new/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                "articleNumber": this.productArticle.value,
                "name": this.productName.value,
                "parameter1": this.productQuantity.value,
                "parameter2": this.productParameter.value,
                "storage": this.state.fetchedData.find(storage => storage.id.toString() === this.productStorage.value)
            })
        })
        .then(
            alert(this.productName.value + " добавлен")
        )
        .then(
            this.setState({
                addGood : false,
                productLoading : true
            }),
            // window.location.reload()
        )
    }

    deleteProduct(id) {
        if(window.confirm('Вы уверены что хотите удалить товар? После удаления его невозможно восстановить')){
            var url = `https://crohe.herokuapp.com/api/product/delete/${id}`
            fetch(url, { 
                method: 'delete', 
            })
            .then(
                alert("Товар удален"),
                this.setState({ productLoading : true })
            )
        } 
    }

	render(){
        
        var url = `https://crohe.herokuapp.com/api/storage/list`
		this.state.loading && fetch(url, { 
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedData: json,
                loading : false,
            })
        })

        this.state.staffLoading && fetch(`https://crohe.herokuapp.com/api/staff/list`, {
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedStaff: json,
                staffLoading : false,
            })
        })

        this.state.productLoading && fetch(`https://crohe.herokuapp.com/api/product/list`, {
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				fetchedProduct: json,
                productLoading : false,
            })
        })

        const storageManagers = this.state.fetchedStaff
            .filter(s => s.position.toLowerCase() === "storagemanager")
            .map(s => <option key={s.id} value={s.id}>{s.firstName + ` ` + s.lastName}</option>)

        const filterStr = this.state.filterStr;
        var filteredSklady = this.state.fetchedData
        if(getUser().position == "StorageManager") {
            filteredSklady = filteredSklady.filter(sklad => sklad.staff.id === getUser().id)
        }
        filteredSklady = filteredSklady
            .filter(s => s.name.toLowerCase().includes(filterStr.toLowerCase()))
            .sort((a, b) => a.id > b.id ? 1 : -1)
            .map(s => <div key={s.id} className='col-3 sklad-column'>
                    <div className='card'>
                        <div className='sklad-title'>
                            {s.name}
                        </div>
                        <div className='sklad-content'>
                            <p className='sklad-address'>
                            {s.address}
                            </p>
                            <p className='sklad-info'>
                            {this.state.fetchedProduct.filter(g => g.storage.id === s.id).length} элементов
                            </p>
                            <button onClick={() => {this.setState({ goodId : '', checkBoxes : [], showSklad : true, currentSklad : this.state.fetchedData.filter(sklad => sklad.id === s.id) }, () => {this.setCheckBoxes()})}} className='sklad-show-button'>Показать</button>
                            { getUser().position === "Admin" && <div className='admin-buttons'>
                                    <button onClick={() => this.setState({ currentSklad : this.state.fetchedData.filter(sklad => sklad.id === s.id), editSklad : true })} className="col-5 default-button">Изменить</button>
                                    <button onClick={() => this.deleteStorage(s.id)} className="col-5 default-button">Удалить</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )
        const filterGoods = this.state.filterGoods;
        var filteredGoods = this.state.fetchedProduct
        if(this.state.currentSklad.length > 0){
            filteredGoods = this.state.fetchedProduct
                .filter(g => g.storage.id === this.state.currentSklad[0].id)
                .filter(g => g.name.toLowerCase().includes(filterGoods.toLowerCase()) || g.articleNumber.toLowerCase().includes(filterGoods.toLowerCase()))
                .map((g, index) => <tr key={g.articleNumber}>
                        <td>
                            <label className="container-check">
                                <input id={index} onChange={(e) => this.getStatus(e)} checked={this.state.checkBoxes[index]} type="checkbox"></input>
                                <span className="checkmark"></span>
                            </label>
                        </td>
                        <td>
                            {g.articleNumber}
                        </td>
                        <td>
                            {g.name}
                        </td>
                        <td>
                            {g.parameter1}
                            {/* { getUser().position !== "SaleManager" && this.state.goodId !== index && <button className='sklad-quantity-button'  onClick={() => this.setState({ goodId : index })}>{g.parameter1}</button>}
                            { getUser().position !== "SaleManager" && this.state.goodId === index && <form>
                                <input className='sklad-quantity-input' type='number' value={g.parameter1}></input>
                                <input className='default-blue-button' type='submit' value='Сохранить'></input>
                            </form>} */}
                        </td>
                        <td>
                            {g.parameter2}
                        </td>
                        <td>
                            { getUser().position !== "SaleManager" && <button onClick={() => this.deleteProduct(g.id)} className='default-white-button'>Удалить</button>}
                        </td>
                    </tr>
                )
        }
		return(
            <div className='sklad-page'>
                {( this.state.currentSklad.length !== 0 || this.state.addGood || this.state.addSklad ) && <div role="button" onClick={() => {this.setState({ changeSkladmen : false, addGood : false, addSklad : false, currentSklad : [], selectAll : false, showSklad : false, editSklad : false })}} onKeyDown={() => {this.setState({ changeSkladmen : false, addGood : false, addSklad : false, currentSklad : [], selectAll : false })}} className='dark-bg'></div>}
                <div className='default-header'>
                    <div className='default-container' style={{height: `100%`}}>
                        <div className='flex-row'>
                            <div className='col-2 flex-item page-title'>
                                Склады
                            </div>
                            <div className='col-5 flex-item'>
                                <form>
                                    <i>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                        </svg>
                                    </i>
                                    <input type={'text'} onChange={e => this.setState({ filterStr: e.target.value })} name="search" id='search' placeholder='Поиск'></input>
                                </form>
                            </div>
                            <div className='col-5 flex-item flex-item-last'>
                                <p className='sklady-quantity'>{this.state.fetchedProduct.length} элементов</p>
                                <button className='three-dots'>•••</button>
                                { getUser().position.toLowerCase() === "admin" && <button onClick={() => this.setState({ addSklad : true })} className='new-sklad-button'>+ ДОБАВИТЬ СКЛАД</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='layout-div body-element default-content'>
                    <div className='add-good'>
                        { getUser().position !== "SaleManager" && <button className='default-blue-button' disabled={this.state.fetchedData.length === 0} onClick={() => this.setState({ addGood : true })}>+ ДОБАВИТЬ ТОВАР</button>}
                    </div>
                    <div className='default-container'>
                        <div className='flex-row'>
                            {filteredSklady}
                        </div>
                    </div>
                    {
                        this.state.addSklad && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ addSklad : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Добавить склад</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <input ref={(ref) => {this.storageName = ref}} required className='default-input' type="text" placeholder="Название"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.storageAddress = ref}} required className='default-input' type="text" placeholder="Адрес"/>
                                    </div>
                                    <div>
                                        <select ref={(ref) => {this.storageManager = ref}} required className='default-input'>
                                            {
                                                storageManagers
                                            }
                                        </select>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input onClick={() => this.newStorage()} className='default-blue-button' type="button" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addSklad : false })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }

                    {
                        this.state.addGood && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ addGood : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Добавить товар</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <select ref={(ref) => {this.productStorage = ref}} required className='default-input'>
                                            {
                                                this.state.fetchedData.map(s => <option key={s.id} value={s.id}>
                                                    {s.name}
                                                </option>)
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.productArticle = ref}} required className='default-input' type="text" placeholder="Артикул"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.productName = ref}} required className='default-input' type="text" placeholder="Название"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.productQuantity = ref}} required className='default-input' type="text" placeholder="Количество"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.productParameter = ref}} required className='default-input' type="text" placeholder="Параметры"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input onClick={() => this.newProduct()} className='default-blue-button' type="submit" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addGood : false })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {this.state.currentSklad.length !== 0 && this.state.showSklad && <div className='sklad-modal'>
                        <span onClick={() => {this.setState({ currentSklad : [], changeSkladmen : false, selectAll : false, showSklad : false })}} className='close-modal'>×</span>
                        <div className='sklad-modal-title'>
                            {this.state.currentSklad[0].name }
                        </div>
                        <div className='sklad-modal-content'>
                            <p className='skladmen-name'>
                                Менеджер по складу: {this.state.currentSklad[0].staff.firstName + " " + this.state.currentSklad[0].staff.lastName}
                            </p>
                            { this.state.changeSkladmen && <form style={{
                                width: 350, margin: "auto", padding: 25
                            }}>
                                <select style={{border: "1px solid #333"}} className='default-input'>
                                    {
                                        storageManagers
                                    }
                                </select>
                                <div className='row' style={{marginTop: 25}}>
                                    <div className='col-6'>
                                        <input className='default-blue-button' type="submit" value="Сохранить" />
                                    </div>
                                    <div className='col-6'>
                                        <input className='default-white-button' onClick={() => this.setState({ changeSkladmen : false })} type="reset" value="Отменить" />
                                    </div>
                                </div>
                            </form>}
                            <div className='sklad-modal-search'>
                                <form>
                                    <div>
                                        <i>
                                            <svg width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                            </svg>
                                        </i>
                                        <input className='default-input grey-bg' onChange={e => this.setState({ filterGoods: e.target.value })} placeholder='Поиск' type="text" />
                                    </div>
                                </form>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <label className="container-check">
                                                <input onChange={() => this.checkAll()} checked={this.state.selectAll} type="checkbox"></input>
                                                <span className="checkmark"></span>
                                            </label>
                                        </th>
                                        <th>Артикул</th>
                                        <th>название</th>
                                        <th>Количество</th>
                                        <th>параметры</th>
                                        <th>Действие</th>
                                    </tr>
                                    { filteredGoods }
                                </tbody>
                            </table>
                        </div>
                    </div>}

                    
                    {
                        this.state.currentSklad.length !== 0 && this.state.editSklad && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ currentSklad : [], editSklad : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Редактировать склад</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <input ref={(ref) => {this.storageNameUpdate = ref}} required defaultValue={this.state.currentSklad[0].name} className='default-input' type="text" placeholder="Название"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.storageAddressUpdate = ref}} required defaultValue={this.state.currentSklad[0].address} className='default-input' type="text" placeholder="Адрес"/>
                                    </div>
                                    <div>
                                        <select ref={(ref) => {this.storageManagerUpdate = ref}} defaultValue={this.state.currentSklad[0].staff.id} required className='default-input'>
                                            {
                                                storageManagers
                                            }
                                        </select>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input onClick={() => this.updateStorage(this.state.currentSklad[0].id)} className='default-blue-button' type="button" value="Сохпанить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ currentSklad : [], editSklad : false })} value="Отмена" />
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

export default Sklady