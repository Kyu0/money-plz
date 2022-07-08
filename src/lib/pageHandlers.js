const exim = require('./exim')

exports.index = (req, res) => {
    const country = exim.results
        .map(data => {
            return {
                'name':data.cur_nm,
                'unit':data.cur_unit
            }
        })
    console.log(country)
    res.render('index', { countries: country })
}