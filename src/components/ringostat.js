import React from 'react'

class RingoStat extends React.Component {    

    state = {
        fetchedData : []
    }

	componentDidMount() {
		fetch("https://api.ringostat.net/calls/list?export_type=json&auth-key=ahWrEDgck4jXGa0lA9qjCX8iMtPtKMMD&from=2022-05-18%2000:00:00&to=2022-05-19%2023:59:59&fields=calldate,caller,dst,disposition,call_type", { 
            method: 'get', 
        })
		.then(response => {
			return response.json();
		})
		.then(json => {
			this.setState({
				loading: false,
				fetchedData: json
			})
		})
	}

	render(){
		const { fetchedData } = this.state;
        console.log(fetchedData)
		return(
            <div className='analytics-right-content'>
                <div className='content-title'>
                    RingoStat
                </div>
                <div className='calls-table'>
                    <table>
                        <tbody>
                            <tr>
                                <th>
                                    <label className="container-check">
                                        <input type="checkbox"></input>
                                        {/* <input onChange={() => this.checkAll()} checked={this.state.selectAll}  type="checkbox"></input> */}
                                        <span className="checkmark"></span>
                                    </label>
                                </th>
                                <th>Дата звонка</th>
                                <th>Клиент</th>
                                <th>Сотрудник</th>
                                <th>Тип звонка</th>
                                <th>Статус</th>
                            </tr>
                            {
                                fetchedData.length > 0 && fetchedData.map((call, index) => {
                                    return <tr key={index}>
                                        <td>
                                            <label className="container-check">
                                                <input type="checkbox"></input>
                                                {/* <input id={index} onChange={(e) => this.getStatus(e)} checked={this.state.checkBoxes[index] || false} type="checkbox"></input> */}
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
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