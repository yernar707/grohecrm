import React from 'react'

class RingoStat extends React.Component {    

    state = {
        fetchedData : [],
        dateFrom : new Date().toLocaleDateString("en-CA", {year: 'numeric', month: '2-digit', day: '2-digit'}),
        dateTo : new Date().toLocaleDateString("en-CA", {year: 'numeric', month: '2-digit', day: '2-digit'}),
        call_type : "",
        disposition : "",
        client : "",
        dst : "",
        sort : "calldate",
        asc : true,
        loading : true
    }    
    
    setSort(name) {
        this.setState({ asc : true })
        if(this.state.sort === name)
            this.setState({ asc : !this.state.asc })
        this.setState({ sort : name })
    }

	render(){
        var url = `https://api.ringostat.net/calls/list?export_type=json&auth-key=ahWrEDgck4jXGa0lA9qjCX8iMtPtKMMD&from=${this.state.dateFrom}%2000:00:00&to=${this.state.dateTo}%2023:59:59&fields=calldate,caller,dst,disposition,call_type`
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

		let { fetchedData } = this.state
        if(this.state.call_type.length > 0)
            fetchedData = fetchedData.filter(call => call.call_type === this.state.call_type)

        if(this.state.disposition.length > 0)
            fetchedData = fetchedData.filter(call => call.disposition === this.state.disposition)

        if(this.state.client.length > 0)
            fetchedData = fetchedData.filter(call => call.caller.toString().includes(this.state.client))

        if(this.state.dst.length > 0)
            fetchedData = fetchedData.filter(call => call.dst.toString().includes(this.state.dst))

        if(!this.state.loading > 0 && this.state.sort.length > 0)
            if(this.state.asc === true)
                fetchedData = fetchedData.sort((a, b) => a[this.state.sort] > b[this.state.sort] ? 1 : -1)
            else 
                fetchedData = fetchedData.sort((a, b) => a[this.state.sort] < b[this.state.sort] ? 1 : -1)

        const caret_down = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 16 16">
            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
        </svg>

        const caret_up = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up" viewBox="0 0 16 16">
            <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
        </svg>
        
		return(
            <div className='analytics-right-content'>
                <div className='content-title'>
                    RingoStat
                </div>
                <div className='calls-filter'>
                    <div className='filter-date-from col-3'>
                        <label>Дата с:</label>
                        <input className='default-input' max={this.state.dateTo} type='date' defaultValue={this.state.dateFrom} onChange={(e) => this.setState({ loading : true, dateFrom : e.target.value })}></input>
                    </div>
                    <div className='filter-date-to col-3'>
                        <label>Дата до:</label>
                        <input className='default-input' min={this.state.dateFrom} type='date' defaultValue={this.state.dateTo} onChange={(e) => this.setState({ loading : true, dateTo : e.target.value })}></input>
                    </div>
                    <div className='filter-type col-3'>
                        <label>Тип вызова:</label>
                        <select className='default-input' onChange={(e) => this.setState({ call_type : e.target.value })}>
                            <option value="">
                                Все
                            </option>
                            <option value="in">
                                Входящий
                            </option>
                            <option value="out">
                                Исходящий
                            </option>
                        </select>
                    </div>
                    <div className='filter-status col-3'>
                        <label>Статус вызова:</label>
                        <select className='default-input' onChange={(e) => this.setState({ disposition : e.target.value })}>
                            <option value="">
                                Все
                            </option>
                            <option value="BUSY">
                                Занято
                            </option>
                            <option value="ANSWERED">
                                Отвечен
                            </option>
                            <option value="NO ANSWER">
                                Нет ответа
                            </option>
                            <option value="REPEATED">
                                Повторный
                            </option>
                            <option value="PROPER">
                                Целевой
                            </option>
                            <option value="VOICEMAIL">
                                Голосовая почта
                            </option>
                        </select>
                    </div>
                    <div className='filter-date-from col-6'>
                        <label>Клиент:</label>
                        <input className='default-input' type='phone' placeholder='77777777777' onChange={(e) => this.setState({ client : e.currentTarget.value })}></input>
                    </div>
                    <div className='filter-date-to col-6'>
                        <label>Сотрудник:</label>
                        <input className='default-input' type='phone' placeholder='77777777777' onChange={(e) => this.setState({ dst : e.currentTarget.value })}></input>
                    </div>
                </div>
                <div className='calls-table'>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <p onClick={() => this.setSort("calldate")}>
                                        Дата звонка 
                                        { this.state.sort === "calldate" && ((this.state.asc && caret_down) || (!this.state.asc && caret_up))}
                                    </p>
                                </th>
                                <th>
                                    <p onClick={() => this.setSort("caller")}>
                                        Клиент
                                        { this.state.sort === "caller" && ((this.state.asc && caret_down) || (!this.state.asc && caret_up))}
                                    </p>
                                </th>
                                <th>
                                    <p onClick={() => this.setSort("dst")}>
                                        Сотрудник
                                        { this.state.sort === "dst" && ((this.state.asc && caret_down) || (!this.state.asc && caret_up))}
                                    </p>
                                </th>
                                <th>
                                    <p onClick={() => this.setSort("call_type")}>
                                        Тип звонка
                                        { this.state.sort === "call_type" && ((this.state.asc && caret_down) || (!this.state.asc && caret_up))}
                                    </p>
                                </th>
                                <th>
                                    <p onClick={() => this.setSort("disposition")}>
                                        Статус
                                        { this.state.sort === "disposition" && ((this.state.asc && caret_down) || (!this.state.asc && caret_up))}
                                    </p>
                                </th>
                            </tr>
                            {
                                !this.state.loading && fetchedData.length > 0 && fetchedData.map((call, index) => {
                                    return <tr key={index}>
                                        <td>
                                            {call.calldate}
                                        </td>
                                        <td>
                                            {call.caller}
                                        </td>
                                        <td>
                                            {call.dst}
                                        </td>
                                        <td>
                                            {call.call_type === "in" ? "Входящий" : "Исходящий"}
                                        </td>
                                        <td>
                                            {call.disposition === "BUSY" && "Занято"}
                                            {call.disposition === "ANSWERED" && "Отвечен"}
                                            {call.disposition === "NO ANSWER" && "Нет ответа"}
                                            {call.disposition === "REPEATED" && "Повторный"}
                                            {call.disposition === "PROPER" && "Целевой"}
                                            {call.disposition === "VOICEMAIL" && "Голосовая почта"}
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default RingoStat