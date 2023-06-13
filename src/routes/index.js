const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/Form',(req,res)=>{
    res.render('Forms');
});

router.post('/Form', async(req,res)=>{
    const {correo,edad,sex,favorite,tiempoF,tiempoW,tiempoTw,tiempoIg,tiempoTik} = req.body;
    const rowsEmails = await pool.query('SELECT correo FROM websocialstime WHERE correo=?',[correo]);
    if(rowsEmails.length>0 || edad==undefined){
        (rowsEmails.length>0) ? req.flash('error','El correo ya existe en el registro de las encuestas') : req.flash('error','No elegiste un rango de edad');
        res.redirect('/Form');
    }
    else{
        const newRegister = {correo,tiempoF,tiempoW,tiempoTw,tiempoIg,tiempoTik,sex,favorite,edad};
        await pool.query('INSERT INTO websocialstime set ?',[newRegister]);
        res.redirect('/');
    }
});

router.get('/',async(req,res)=>{
    const countRequest = await pool.query('SELECT count(*) as countR FROM websocialstime');
    if(countRequest[0].countR==0) res.render('show');
    else{
        const time = await pool.query('SELECT avg(tiempoF) as promF,avg(tiempoW) as promW,avg(tiempoTw) promTw,avg(tiempoIg) as promIg,avg(tiempoTik) as promTik FROM websocialstime');
        const num = await pool.query('SELECT count(favorite) as "num", favorite FROM websocialstime GROUP BY favorite ORDER BY favorite');
        const edadF = await pool.query('SELECT count(*) AS cantidad FROM websocialstime GROUP BY favorite,edad having favorite="facebook"');
        const edadW = await pool.query('SELECT count(*) AS cantidad FROM websocialstime GROUP BY favorite,edad having favorite="whatsapp"');
        const edadTw = await pool.query('SELECT count(*) AS cantidad FROM websocialstime GROUP BY favorite,edad having favorite="twitter"');
        const edadIg = await pool.query('SELECT count(*) AS cantidad FROM websocialstime GROUP BY favorite,edad having favorite="instagram"');
        const edadTik = await pool.query('SELECT count(*) AS cantidad FROM websocialstime GROUP BY favorite,edad having favorite="tiktok"');
        let favorites = ['facebook','instagram','tiktok','twitter','whatsapp'], r;
        const dt = favorites.map(y=>{
            let j=0;
            num.forEach(x=>{
                if(x.favorite.includes(y)==false) j++;
                if(x.favorite.includes(y)) y = x.num;
            });
            if(j==num.length) r=y;
            if(typeof y === "string")  return y=0;
            return y;
        });
        if(num.length==5) res.render('show',{count:countRequest[0].countR,prom:time[0],mostFavorite:num[0].favorite,noFavorite:num[num.length-1].favorite,num:dt,edadF,edadW,edadTw,edadIg,edadTik});
        else res.render('show',{count:countRequest[0].countR,prom:time[0],mostFavorite:num[0].favorite,noFavorite:r,num:dt,edadFb:edadF,edadF,edadW,edadTw,edadIg,edadTik});
    }
});

module.exports = router;