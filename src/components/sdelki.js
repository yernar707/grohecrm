import React from 'react'
import { StaticImage } from 'gatsby-plugin-image';
import { getUser } from "../services/auth";

class Sdelki extends React.Component {
    state = {
        showQuickAdd : false,
        addSdelka : false,
        sdelkaId: 0,
        fetchedData : [],
        loading : true,
        currentTransaction : [],
        fetchedStaff : [],
        loadingStaff : true,
    }

    addTransactionQuick() {
        let valid = true
        this.state.fetchedData.forEach(transaction => {
            if(transaction.name === this.nameQuick.value){
                valid = false
                alert("Сделка с таким названием существует")
            }
        })
        valid && fetch('https://crohe.herokuapp.com/api/transaction/new/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                "fromPerson" : getUser().firstName + " " + getUser().lastName,
                "name": this.nameQuick.value,
                "price": this.priceQuick.value,
                "phoneNumber": this.phoneNumberQuick.value,
                "email" : this.emailQuick.value,
                "companyName" : this.companyNameQuick.value,
                "address" : this.addressQuick.value,
                "stage" : 1
            })
        })
        .then( response =>{
            if(response.ok){
                alert(this.nameQuick.value + " добавлен")
                this.setState({
                    loading : true,
                    showQuickAdd: false
                })
                return response.json();
            }
            alert("Ошибка")
        })
    }

    addTransaction() {
        let valid = true
        this.state.fetchedData.forEach(transaction => {
            if(transaction.name === this.name.value){
                valid = false
                alert("Сделка с таким названием существует")
            }
        })
        valid && fetch('https://crohe.herokuapp.com/api/transaction/new/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                "fromPerson" : getUser().firstName + " " + getUser().lastName,
                "name" : this.name.value,
                "price" : this.price.value,
                "phoneNumber": this.phoneNumber.value,
                "email" : this.email.value,
                "companyName" : this.companyName.value,
                "address" : this.address.value,
                "stage" : 1
            })
        })
        .then( response =>{
            if(response.ok){
                    alert(this.name.value + " добавлен")
                this.setState({
                    addSdelka : false,
                    loading : true
                })
                return response.json();
            }
            alert("Ошибка")
        })
    }

    setStage(id) {
        let current = this.state.fetchedData.find(transaction => transaction.id === id)
        let body = {
            "fromPerson": current.fromPerson,
            "name":  current.name,
            "price":  parseInt(current.price),
            "phoneNumber":  current.phoneNumber, 
            "email" :  current.email,
            "companyName" :  current.companyName,
            "address" :  current.address,
            "stage" : parseInt(this.stage.value)
        }
        console.log(id, body)
        fetch(`https://crohe.herokuapp.com/api/transaction/update/${id}`, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify(body)
        })
        .then( response =>{
            if(response.ok){
                alert(current.name + " изменен")
                this.setState({
                    loading :  true,
                    sdelkaId : "",
                    currentTransaction : []
                })
                return response.json();
            }
            alert("Ошибка")
        })
        .catch(error => console.log(error))
    }

    deleteTransaction(id) {
        if(window.confirm('Вы уверены что хотите удалить сделку? После удаления его невозможно восстановить')){
            var url = `https://crohe.herokuapp.com/api/transaction/delete/${id}`
            fetch(url, { 
                method: 'delete', 
            })
            .then( response =>{
                if(response.ok){
                    alert("Сделка удалена")
                    this.setState({
                        addSdelka : false,
                        loading : true,
                        currentTransaction : [],
                        sdelkaId : ""
                    })
                    return response;
                }
                alert("Ошибка")
            })
        } 
    }

    forAll () {
        this.state.fetchedData.forEach(transaction => {
            let body = {
                "fromPerson": "4",
                "name":  transaction.name,
                "price":  transaction.price,
                "phoneNumber":  transaction.phoneNumber, 
                "email" :  transaction.email,
                "companyName" :  transaction.companyName,
                "address" :  transaction.address,
                "stage" : 1
            }
            fetch(`https://crohe.herokuapp.com/api/transaction/update/${transaction.id}`, {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                mode: 'cors',
                body: JSON.stringify(body)
            })
            .then( response =>{
                if(response.ok){
                    this.setState({
                        loading :  true,
                        sdelkaId : "",
                        currentTransaction : []
                    })
                    return response.json();
                }
                alert("Ошибка")
            })
            .catch(error => console.log(error))
        })
    }

	render(){
        var url = `https://crohe.herokuapp.com/api/transaction/list`
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


        this.state.currentTransaction.length !== 0 && fetch(`https://crohe.herokuapp.com/api/staff/get/${parseInt(this.state.currentTransaction.fromPerson)}`, { 
                method: 'get', 
            })
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    fetchedStaff : json,
                    loadingStaff : false,
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
        
		return(
            <div className='sdelki-page'>
                {( this.state.addSdelka || this.state.currentTransaction.length !== 0 ) && <div onClick={() => this.setState({ addSdelka : false, currentTransaction : []})} className='dark-bg'></div>}
                <div className='default-header'>
                    <div className='default-container' style={{height: `100%`}}>
                        <div className='flex-row'>
                            <div className='col-2 flex-item page-title'>
                                Сделки
                            </div>
                            <div className='col-5 flex-item'>
                                <form>
                                    <i>
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.4026 11.4026C11.7856 11.0196 12.4066 11.0196 12.7896 11.4026L16.7127 15.3257C17.0957 15.7087 17.0957 16.3297 16.7127 16.7127C16.3297 17.0958 15.7087 17.0958 15.3257 16.7127L11.4026 12.7897C11.0196 12.4067 11.0196 11.7857 11.4026 11.4026Z" fill="white"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.19231 1.96154C4.30343 1.96154 1.96154 4.30343 1.96154 7.19231C1.96154 10.0812 4.30343 12.4231 7.19231 12.4231C10.0812 12.4231 12.4231 10.0812 12.4231 7.19231C12.4231 4.30343 10.0812 1.96154 7.19231 1.96154ZM0 7.19231C0 3.22011 3.22011 0 7.19231 0C11.1645 0 14.3846 3.22011 14.3846 7.19231C14.3846 11.1645 11.1645 14.3846 7.19231 14.3846C3.22011 14.3846 0 11.1645 0 7.19231Z" fill="white"/>
                                        </svg>
                                    </i>
                                    <input type={'text'} name="search" id='search' placeholder='Поиск'></input>
                                </form>
                            </div>
                            <div className='col-5 flex-item flex-item-last'>
                                <p className='sdelki-quantity'>{this.state.fetchedData.length} сделок: </p>
                                <p className='sdelki-money'>{this.state.fetchedData.reduce((partialSum, a) => partialSum + a.price, 0)} тенге</p>
                                <button className='three-dots'>•••</button>
                                <button className='settings-button'>НАСТРОЙКА</button>
                                <button onClick={() => this.setState({ addSdelka : true })} className='new-sdelka-button'>+ НОВАЯ СДЕЛКА</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='layout-div body-element default-content'>
                    <div className='default-container'>
                        <div className='flex-row'>
                            <div className='col-3 sdelki-column first-column'>
                                <div className='column-title'>
                                    первичный контакт
                                </div>
                                <div className='column-subtitle'>
                                    {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 1)
                                            .length
                                    } сделок: {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 1)
                                            .reduce((partialSum, a) => partialSum + a.price, 0)} тенге
                                </div>
                                <hr></hr>
                                {
                                    !this.state.loading && this.state.fetchedData
                                    .sort((a,b) => a.id > b.id ? 1 : -1)
                                    .filter(transaction => transaction.stage === 1)
                                    .map(transaction => 
                                        <div key={transaction.id} className='sdelka'>
                                            <div className='card'>
                                                <div className='sdelka-title'>
                                                    {transaction.name}
                                                </div>
                                                <div className='sdelka-company'>
                                                    Компания: {transaction.companyName}
                                                </div>
                                                <div className='sdelka-price'>
                                                    Бюджет: {transaction.price} тг
                                                </div>
                                                <div className='sdelka-show'>
                                                    <span onClick={() => this.setState({ currentTransaction : transaction })}>Показать</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                {/* <div className='sdelka'>
                                    <div className='card'>
                                        <div className='sdelka-title'>
                                            Текст
                                        </div>
                                        <div className='sdelka-company'>
                                            Компания: название
                                        </div>
                                        <div className='sdelka-price'>
                                            50000 тг
                                        </div>
                                        <div className='sdelka-show'>
                                            <span onClick={() => this.setState({ sdelkaId : 1 })}>Показать</span>
                                        </div>
                                    </div>
                                </div> */}
                                {/* {!this.state.showQuickAdd && <button onClick={() => this.setState({showQuickAdd:true})} className='quick-add'>Быстрое добавление</button>} */}
                                {this.state.showQuickAdd && <div>
                                        <form className='quick-add-form'>
                                            <div>
                                                <input ref={(ref) => {this.nameQuick = ref}} name='sdelka-name' type='text' placeholder='Название'></input>
                                            </div>
                                            <div>
                                                <input ref={(ref) => {this.priceQuick = ref}} name='price' type='number' placeholder='0 тг'></input>
                                            </div>
                                            {/* <div>
                                                <input name='contact-name' type='text' placeholder='Контакт: имя'></input>
                                            </div> */}
                                            <div>
                                                <input ref={(ref) => {this.phoneNumberQuick = ref}} name='contact-phone' type='phone' placeholder='Контакт: телефон'></input>
                                            </div>
                                            <div>
                                                <input ref={(ref) => {this.emailQuick = ref}} name='contact-email' type='mail' placeholder='Контакт: E-mail'></input>
                                            </div>
                                            <div>
                                                <input ref={(ref) => {this.companyNameQuick = ref}} name='company-name' type='text' placeholder='Компания: название'></input>
                                            </div>
                                            <div>
                                                <input ref={(ref) => {this.addressQuick = ref}} name='company-address' type='text' placeholder='Компания: адрес'></input>
                                            </div>
                                            <div className='flex-row'>
                                                <div className='col-5'>
                                                    {/* <input className='submit-button' type='button' onClick={() => this.addTransactionQuick()} value="Добавить"></input> */}
                                                    <input className='submit-button' type='button' onClick={() => this.forAll()} value="resetAll"></input>
                                                </div> 
                                                <div className='col-5'>
                                                    <input type='reset' className='cancel-button'  onClick={() => this.setState({showQuickAdd:false})} value={"Отменить"}></input>
                                                </div>
                                            </div>                                            
                                        </form>
                                    </div>
                                }
                            </div>
                            <div className='col-3 sdelki-column second-column'>
                                <div className='column-title'>
                                    переговоры
                                </div>
                                <div className='column-subtitle'>
                                    {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 2)
                                            .length
                                    } сделок: {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 2)
                                            .reduce((partialSum, a) => partialSum + a.price, 0)} тенге
                                </div>
                                <hr></hr>
                                {
                                    !this.state.loading && this.state.fetchedData
                                    .sort((a,b) => a.id > b.id ? 1 : -1)
                                    .filter(transaction => transaction.stage === 2)
                                    .map(transaction => 
                                        <div key={transaction.id} className='sdelka'>
                                            <div className='card'>
                                                <div className='sdelka-title'>
                                                    {transaction.name}
                                                </div>
                                                <div className='sdelka-company'>
                                                    Компания: {transaction.companyName}
                                                </div>
                                                <div className='sdelka-price'>
                                                    Бюджет: {transaction.price} тг
                                                </div>
                                                <div className='sdelka-show'>
                                                    <span onClick={() => this.setState({ currentTransaction : transaction })}>Показать</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='col-3 sdelki-column third-column'>
                                <div className='column-title'>
                                    Принимают решение
                                </div>
                                <div className='column-subtitle'>
                                    {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 3)
                                            .length
                                    } сделок: {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 3)
                                            .reduce((partialSum, a) => partialSum + a.price, 0)} тенге
                                </div>
                                <hr></hr>
                                {
                                    !this.state.loading && this.state.fetchedData
                                    .sort((a,b) => a.id > b.id ? 1 : -1)
                                    .filter(transaction => transaction.stage === 3)
                                    .map(transaction => 
                                        <div key={transaction.id} className='sdelka'>
                                            <div className='card'>
                                                <div className='sdelka-title'>
                                                    {transaction.name}
                                                </div>
                                                <div className='sdelka-company'>
                                                    Компания: {transaction.companyName}
                                                </div>
                                                <div className='sdelka-price'>
                                                    Бюджет: {transaction.price} тг
                                                </div>
                                                <div className='sdelka-show'>
                                                    <span onClick={() => this.setState({ currentTransaction : transaction })}>Показать</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='col-3 sdelki-column fourth-column'>
                                <div className='column-title'>
                                    согласование договора
                                </div>
                                <div className='column-subtitle'>
                                    {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 4)
                                            .length
                                    } сделок: {
                                        this.state.fetchedData
                                            .filter(transaction => transaction.stage === 4)
                                            .reduce((partialSum, a) => partialSum + a.price, 0)} тенге
                                </div>
                                <hr></hr>
                                {
                                    !this.state.loading && this.state.fetchedData
                                    .sort((a,b) => a.id > b.id ? 1 : -1)
                                    .filter(transaction => transaction.stage === 4)
                                    .map(transaction => 
                                        <div key={transaction.id} className='sdelka'>
                                            <div className='card'>
                                                <div className='sdelka-title'>
                                                    {transaction.name}
                                                </div>
                                                <div className='sdelka-company'>
                                                    Компания: {transaction.companyName}
                                                </div>
                                                <div className='sdelka-price'>
                                                    Бюджет: {transaction.price} тг
                                                </div>
                                                <div className='sdelka-show'>
                                                    <span onClick={() => this.setState({ currentTransaction : transaction })}>Показать</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.addSdelka && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ addSdelka : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Новая сделка</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <input ref={(ref) => {this.name = ref}} className='default-input' type="text" placeholder="Название"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.price = ref}} className='default-input' type="number" placeholder="0 тг"/>
                                    </div>
                                    {/* <div>
                                        <input className='default-input' type="text" placeholder="Контакт: имя"/>
                                    </div> */}
                                    <div>
                                        <input ref={(ref) => {this.phoneNumber = ref}} className='default-input' type="text" placeholder="Контакт: телефон"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.email = ref}} className='default-input' type="text" placeholder="Контакт: E-mail"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.companyName = ref}} className='default-input' type="text" placeholder="Компания: название"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.address = ref}} className='default-input' type="text" placeholder="Компания: адрес"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' type="button" onClick={() => this.addTransaction()} value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addSdelka : false })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    
                    {
                        this.state.currentTransaction.length !== 0 && <div className='sdelka-modal'>
                            <span onClick={() => this.setState({ currentTransaction : [] })} className='close-modal'>×</span>
                            <div className='sdelka-modal-title'>
                                {this.state.currentTransaction.name}
                            </div>
                            <div className='sdelka-modal-content'>
                                <div>
                                    <h5>От: 
                                        {
                                            !this.state.loadingStaff && " " + this.state.fetchedStaff.firstName + " " + this.state.fetchedStaff.lastName 
                                        }
                                    </h5>
                                </div>
                                <div>
                                    <h5>Основной контакт</h5>
                                    <ul>
                                        <li>Номер телефона: {this.state.currentTransaction.phoneNumber}</li>
                                        <li>Почта: {this.state.currentTransaction.email}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5>Компания контакта</h5>
                                    <ul>
                                        <li>Название: {this.state.currentTransaction.companyName}</li>
                                        <li>Адрес: {this.state.currentTransaction.address ? this.state.currentTransaction.address : "Жердің бір жері"}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5>Бюджет: {this.state.currentTransaction.price} тг</h5>
                                </div>
                                <div>
                                    <form>
                                        <div>
                                            <select ref={(ref) => {this.stage = ref}} defaultValue={this.state.currentTransaction.stage} className='default-input'>
                                                <option value={1}>ПЕРВИЧНЫЙ КОНТАКТ</option>
                                                <option value={2}>ПЕРЕГОВОРЫ</option>
                                                <option value={3}>ПРИНИМАЮТ РЕШЕНИЕ</option>
                                                <option value={4}>СОГЛАСОВАНИЕ ДОГОВОРА</option>
                                            </select>
                                        </div>
                                        <div>
                                            <input onClick={() => this.setStage(this.state.currentTransaction.id)} className='default-blue-button' type="button" value="Сохранить" />
                                            <input onClick={() => this.deleteTransaction(this.state.currentTransaction.id)} className='default-white-button' type="button" value="Удалить" />
                                            <input onClick={() => this.setState({ currentTransaction : [] })} className='default-white-button' type="reset" value="Отменить" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
        )
    }

}

export default Sdelki