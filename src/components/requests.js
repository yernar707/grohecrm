import React from 'react'
import { getUser } from "../services/auth"

class Requests extends React.Component {
    

    state = {
        selectAll : false,
        checkBoxes : [],
        sendRequest : false,
        filteredRequests : [],
        filterStr : ""
    }

    requests = [
        {
            date : "10.05.2022",
            id : 1,
            src : "John Snow",
            dest : "Rob Stark",
            status : "processing",
            sklad : "Склад 1",
            article : "a020a2020a",
            quantity : 5,
        }, 
        {
            date : "12.05.2022",
            id : 2,
            src : "John Snow",
            dest : "Rob Stark",
            status : "accepted",
            sklad : "Склад 1",
            article : "b020a2020a",
            quantity : 12,
        },
        {
            date : "18.05.2022",
            id : 3,
            src : "John Snow",
            dest : "Rob Stark",
            status : "done",
            sklad : "Склад 1",
            article : "с020a2020a",
            quantity : 8,
        },
        {
            date : "10.05.2022",
            id : 4,
            src : "John Snow",
            dest : "Rob Stark",
            status : "processing",
            sklad : "Склад 2",
            article : "d020a2020a",
            quantity : 5,
        },
        {
            date : "17.05.2022",
            id : 5,
            src : "John Snow",
            dest : "Rob Stark",
            status : "processing",
            sklad : "Склад 2",
            article : "d020a2020a",
            quantity : 5,
        },
        {
            date : "15.05.2022",
            id : 6,
            src : "John Snow",
            dest : "Rob Stark",
            status : "processing",
            sklad : "Склад 3",
            article : "e020a2020a",
            quantity : 5,
        },
    ]

    componentDidMount() {
        let temp = new Array(this.requests.length).fill(false)
        this.setState({ checkBoxes : temp, filteredRequests : this.requests })
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
        const { filterStr } = this.state
        const filteredRequests = this.requests
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
                    {r.id}
                </td>
                <td>
                    {r.src}
                </td>
                <td>
                    {r.dest}
                </td>
                <td>
                    {r.status === "processing" && "Обрабатывается"}
                    {r.status === "accepted" && "Принят"}
                    {r.status === "done" && "Завершен"}
                </td>
                <td>
                    {r.sklad}
                </td>
                <td>
                    {r.article}
                </td>
                <td>
                    {r.quantity}
                </td>
                <td className='flex-row'>
                    {r.status === "processing" && <button className={`default-blue-button ${ getUser().position.toLowerCase() === "admin" && "col-6"}`}>Принять</button>}
                    {r.status === "accepted" && <button className={`default-blue-button ${ getUser().position.toLowerCase() === "admin" && "col-6"}`}>Завершить</button>}
                    {r.status === "done" && <button className={`default-button ${ getUser().position.toLowerCase() === "admin" && "col-6"}`} disabled>Завершен</button>}
                    { getUser().position.toLowerCase() === "admin" && <button className='default-white-button'>Удалить</button>}
                </td>
            </tr>)
		return(
            <div className='sklad-page'>
                {this.state.sendRequest && <div onClick={() => this.setState({ sendRequest : false })} className='dark-bg'></div>}
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
                                <p className='sklady-quantity'>{this.requests.length} заявки</p>
                                <button className='three-dots'>•••</button>
                                <button onClick={() => this.setState({  sendRequest : true })} className='new-sklad-button'>+ ОТПРАВИТЬ ЗАЯВКУ</button>
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
                                    <th>
                                        Действие
                                    </th>
                                </tr>
                                {filteredRequests}
                            </tbody>
                        </table>
                    </div>
                    

                    {
                        this.state.sendRequest && <div className='new-good-modal'>
                            <span onClick={() => this.setState({ sendRequest : false })} className='close-modal'>×</span>
                            <div className='new-good-modal-title'>
                                <p>Новая заявка</p>
                            </div>
                            <div className='new-good-modal-content'>
                                <form>
                                    <div>
                                        <select className='default-input'>
                                            <option value="1">
                                                Склад 1
                                            </option>
                                            <option value="2">
                                                Склад 2
                                            </option>
                                            <option value="3">
                                                Склад 3
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <input className='default-input' type="text" placeholder="Артикуль"/>
                                    </div>
                                    <div>
                                        <input className='default-input' type="number" min={1} placeholder="Количество"/>
                                    </div>
                                    <div className='new-good-buttons'>
                                        <input className='default-blue-button' type="submit" value="Добавить" />
                                        <input className='default-white-button' type="reset" onClick={() => this.setState({ sendRequest : false })} value="Отмена" />
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