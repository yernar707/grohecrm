import React from 'react'

class Staff extends React.Component {
    

    state = {
        selectAll : false,
        checkBoxes : [],
        addStaff : false,
        filteredStaff : [],
        filterStr : ""
    }

    staff = [{
        name : "John Snow",
        position : "Менеджер по продажам",
        phone : "87085639061",
        email : "john@mail.com",
        role : "marketing"
    }, {
        name : "Rob Stark",
        position : "Менеджер по складам",
        phone : "87777777777",
        email : "rob@mail.com",
        role : "stocking"
    }]

    componentDidMount() {
        let temp = new Array(this.staff.length).fill(false)
        this.setState({ checkBoxes : temp, filteredStaff : this.staff })
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

	render(){
        const filterStr = this.state.filterStr;

        const filteredStaff = this.staff
            .filter(e => e.name.toLowerCase().includes(filterStr.toLowerCase()))
            .map((employee, index) => <tr key={index}>
                <td>
                    <label className="container-check">
                        <input id={index} onChange={(e) => this.getStatus(e)} checked={this.state.checkBoxes[index] || false} type="checkbox"></input>
                        <span className="checkmark"></span>
                    </label>
                </td>
                <td>
                    {employee.name}
                </td>
                <td>
                    {employee.position}
                </td>
                <td>
                    {employee.phone}
                </td>
                <td>
                    {employee.email}
                </td>
                <td>
                    {employee.role}
                </td>
            </tr>
            
          )
    
		return(
            <div className='sklad-page'>
                {this.state.addStaff && <div onClick={() => this.setState({ addStaff : false })} className='dark-bg'></div>}
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
                                <p className='sklady-quantity'>3 сотрудника</p>
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
                                    <th>
                                        <label className="container-check">
                                            <input onChange={() => this.checkAll()} checked={this.state.selectAll}  type="checkbox"></input>
                                            <span className="checkmark"></span>
                                        </label>
                                    </th>
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
                                        Роль
                                    </th>
                                </tr>
                                {filteredStaff}
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
                                <form>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Имя и Фамилия"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Адрес почты"/>
                                    </div>
                                    <div>
                                        <select className='default-input'>
                                            <option value="skladmen">
                                                Менеджер по складу
                                            </option>
                                            <option value="Skladmen 2">
                                                Менеджер по продажам
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Логин"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Пароль"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' type="submit" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ addStaff : false })} value="Отмена" />
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