import arrow from './icons8-arrow-80.png';


function NutritionTable ({label, quantity, unit}) {
    return(
       
                <tr>  
                    <td className="label table">{label}</td>
                    <td><img className='arrow' src={arrow} width={5} alt='arrow'/></td>
                    <td className="units table">{quantity.toFixed(2)}{unit}</td>
                </tr>
       
    )
}
export default NutritionTable;