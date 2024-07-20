import arrow from './icons8-arrow-80.png';
function NutritionTable ({label, quantity, unit}) {
    return(
        <div className="nutrition">
            <table>
                <tr>
                    <td className="label table">{label}</td>
                    <td><img className='arrow' src={arrow} width={5} alt='arrow'/></td>
                    <td className="units table">{quantity.toFixed(2)}{unit}</td>
                </tr>
            </table>
        </div>
    )
}
export default NutritionTable;