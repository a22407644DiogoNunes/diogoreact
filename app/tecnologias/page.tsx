import React from "react"
import tecnologias from '@/app/data/tecnologias.json';

export default function Page() {
    const tecno = tecnologias;

    return (
        <>
        <h2>Tecnologias Exploradas</h2>

        {tecno.map((item, i) => (
            <div key={i}>
                <h2>{item.title}</h2>
                <img src={item.image} alt={item.title} width={200} height={200}/>
                <p>{item.description}</p>
                <p>{item.rating}</p>
            </div>
        ))}
    </>
    )
}