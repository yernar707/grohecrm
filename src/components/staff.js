import React from 'react'

class Staff extends React.Component {
    

    state = {
        fetchedData : [],
        loading : true,
        selectAll : false,
        checkBoxes : [],
        addStaff : false,
        filteredStaff : [],
        filterStr : "",
        currentUser : [],
        currentUserId : "",
    }
    componentDidMount() {
        // let temp = new Array(this.staff.length).fill(false)
        // this.setState({ checkBoxes : temp, filteredStaff : this.staff })
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

    addStaff() {
        let valid = true
        this.state.fetchedData.forEach(user => {
            if(user.login === this.login.value){
                valid = false
                alert("Пользователь с таким логином существует")
            }
        })
        valid && fetch('https://crohe.herokuapp.com/api/staff/new/', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify({
                "firstName": this.firstName.value,
                "lastName": this.lastName.value,
                "email": this.email.value,
                "position" : this.position.value,
                "phoneNumber" : this.phoneNumber.value,
                "login" : this.login.value,
                "password" : this.password.value
            })
        })
        .then(
            alert(this.firstName.value + " добавлен")
        )
        .then(
            this.setState({
                addStaff : false
            }),
            window.location.reload()
        )
    }

    deleteUser(id) {
        if(window.confirm('Вы уверены что хотите удалить сотрудника? После удаления его невозможно восстановить')){
            var url = `https://crohe.herokuapp.com/api/staff/delete/${id}`
            fetch(url, { 
                method: 'delete', 
            })
            .then(
                alert("Сотрудник удален")
            )
        } 
    }

    updateUser(id) {
        let valid = true
        this.state.fetchedData.forEach(user => {
            if(user.login !== this.state.currentUser.login && user.login === this.loginUpdate.value){
                valid = false
                alert("Пользователь с таким логином существует")
            }
        })
        let password = this.state.currentUser.password
        if(this.newPasswordCheck.checked)
            password = this.passwordUpdate.value
        let body = {
            "firstName": this.firstNameUpdate.value,
            "lastName": this.lastNameUpdate.value,
            "email": this.emailUpdate.value,
            "position": this.state.currentUser.position, 
            "phoneNumber" : this.phoneNumberUpdate.value,
            "login" : this.loginUpdate.value,
            "password" : password
        }
        valid && fetch(`https://crohe.herokuapp.com/api/staff/update/${id}`, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            body: JSON.stringify(body)
        })
        .then(
            alert(this.firstNameUpdate.value + " изменен")
        )
        .then(
            this.setState({
                addStaff : false
            }),
            window.location.reload()
        )
    }

	render(){
        var url = `https://crohe.herokuapp.com/api/staff/list`
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
                // checkBoxes: new Array(this.state.fetchedData.length).fill(false)
            })
        })

        this.state.currentUserId && fetch(`https://crohe.herokuapp.com/api/staff/get/${this.state.currentUserId}`, {
            method: 'get',
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            this.setState({
                currentUser : json
            })
        })

        const filterStr = this.state.filterStr;

        const filteredStaff = this.state.fetchedData
            .filter(e => e.firstName.toLowerCase().includes(filterStr.toLowerCase()) || e.lastName.toLowerCase().includes(filterStr.toLowerCase()))
            .sort((a,b) => a.id > b.id ? 1 : -1)
            .map((employee, index) => <tr key={index}>
                {/* <td>
                    <label className="container-check">
                        <input id={index} onChange={(e) => this.getStatus(e)} checked={this.state.checkBoxes[index] || false} type="checkbox"></input>
                        <span className="checkmark"></span>
                    </label>
                </td> */}
                <td>
                    {employee.firstName + " " + employee.lastName}
                </td>
                <td>
                    {employee.position}
                </td>
                <td>
                    {employee.phoneNumber}
                </td>
                <td>
                    {employee.email}
                </td>
                <td>
                    {employee.login}
                </td>
                <td>
                    {employee.password}
                </td>
                <td>
                    <div className='flex-row'>
                        <button onClick={() => this.setState( { currentUserId : employee.id })} className='default-blue-button col-4'>Изменить</button>
                        <form className='col-5'>
                            <button disabled={employee.position.toLowerCase() === "admin"} onClick={() => this.deleteUser(employee.id)} className='default-white-button'>Удалить</button>
                        </form>         
                    </div>
                     </td>
            </tr>
        )
    
		return(
            <div className='sklad-page'>
                {(this.state.addStaff || this.state.currentUserId !== "") && <div onClick={() => this.setState({ addStaff : false, currentUserId : "" })} className='dark-bg'></div>}
                <div className='default-header'>
                    <div className='default-container' style={{height: `100%`}}>
                        <div className='flex-row'>
                            <div className='col-2 flex-item page-title'>
                                Сотрудники
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
                                <p className='sklady-quantity'>{filteredStaff.length} сотрудника</p>
                                <button className='three-dots'>•••</button>
                                <button onClick={() => this.setState({ addStaff : true })} className='new-sklad-button'>+ ДОБАВИТЬ СОТРУДНИКА</button>
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
                                    {/* <th>
                                        <label className="container-check">
                                            <input onChange={() => this.checkAll()} checked={this.state.selectAll}  type="checkbox"></input>
                                            <span className="checkmark"></span>
                                        </label>
                                    </th> */}
                                    <th>
                                        имя и фамилия
                                    </th>
                                    <th>
                                        должность
                                    </th>
                                    <th>
                                        телефон
                                    </th>
                                    <th>
                                        email
                                    </th>
                                    <th>
                                        Логин
                                    </th>
                                    <th>
                                        пароль
                                    </th>
                                    <th>
                                        Действие
                                    </th>
                                </tr>
                                { !this.state.loading && filteredStaff}
                            </tbody>
                        </table>
                    </div>
                    

                    {
                        this.state.addStaff && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ addStaff : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Добавить сотрудника</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form >
                                    <div>
                                        <input ref={(ref) => {this.firstName = ref}} className='default-input' type="text" placeholder="Имя"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.lastName = ref}} className='default-input' type="text" placeholder="Фамилия"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.email = ref}} className='default-input' type="text" placeholder="Адрес почты"/>
                                    </div>
                                    <div>
                                        <select ref={(ref) => {this.position = ref}} className='default-input'>
                                            <option value="StorageManager">
                                                Менеджер по складу
                                            </option>
                                            <option value="SaleManager">
                                                Менеджер по продажам
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.phoneNumber = ref}} className='default-input' type="text" placeholder="Номер телефона"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.login = ref}} className='default-input' type="text" placeholder="Логин"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.password = ref}} className='default-input' type="text" placeholder="Пароль"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' onClick={() => this.addStaff()} type="button" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addStaff : false })} value="Отмена" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    }
                    {
                        this.state.currentUserId !== "" && this.state.currentUser.length !== 0 && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ currentUserId : "" })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Изменить сотрудника</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <input ref={(ref) => {this.firstNameUpdate = ref}} defaultValue={this.state.currentUser.firstName} className='default-input' type="text" placeholder="Имя"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.lastNameUpdate = ref}} defaultValue={this.state.currentUser.lastName} className='default-input' type="text" placeholder="Фамилия"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.emailUpdate = ref}} defaultValue={this.state.currentUser.email} className='default-input' type="text" placeholder="Адрес почты"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.phoneNumberUpdate = ref}} defaultValue={this.state.currentUser.phoneNumber} className='default-input' type="text" placeholder="Номер телефона"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.loginUpdate = ref}} defaultValue={this.state.currentUser.login} className='default-input' type="text" placeholder="Логин"/>
                                    </div>
                                    <div>
                                        <input ref={(ref) => {this.passwordUpdate = ref}} className='default-input' type="password" placeholder="Новый пароль"/>
                                    </div>
                                    <div className='flex-row' style={{alignItems: 'baseline'}}>
                                        <label style={{marginRight: 15}}>Сохранить новый пароль</label>
                                        <input ref={(ref) => {this.newPasswordCheck = ref}} type="checkbox"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' onClick={() => this.updateUser(this.state.currentUserId)} type="button" value="Сохранить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ currentUserId : "" })} value="Отмена" />
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

export default Staff