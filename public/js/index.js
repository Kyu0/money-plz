const exchangeForm = document.getElementById('form-exchange');
const koreaMoneyInput = document.getElementById('koreaMoney');
const resultTag = document.getElementById('result');

(function () {
    exchangeForm.addEventListener('submit', event => {
            event.preventDefault();
            const form = event.target;
            const query = {
                koreaMoney: form.elements.koreaMoney.value.replace(/,/g, ''),
                destUnit: form.elements.destUnit.value
            };
            
            const headers = { 'Content-Type': 'application/json' };
            fetch(`/exchange?koreaMoney=${query.koreaMoney}&destUnit=${query.destUnit}`, { method: 'get', headers: headers})
                .then(response => {
                    if (response.status < 200 || response.status >= 300)
                        throw new Error(`요청에 실패했습니다. 요청 응답 상태 코드 : ${response.status}`);
                    return response.json();
                })
                .then(json => {
                    resultTag.innerHTML = `<b>바로 환전 한다면... : ${json.directExchangeResult}</b>`;
                    json.results
                        .map(result => resultTag.innerHTML += `<br><b>${result[0]} ${result[1]} / 이득 본 금액 : ${(result[1] - json.directExchangeResult).toFixed(2)}</b>`);
                })
        })

    koreaMoneyInput.addEventListener('keyup', () => {
        inputNumberFormat(koreaMoneyInput);
    });
}) ();