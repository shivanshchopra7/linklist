'use client';

import { addDays, differenceInDays, parseISO, formatISO9075 } from "date-fns";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"


  
export default function Chart({data}) {


const xLabelKey = Object.keys(data[0]).find(key => key !== 'date');
   
const dataWithoutGaps = [];

data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
        date,
        [xLabelKey]: value?.[xLabelKey] || 0,
    })
    const nextDate = data?.[index + 1]?.date;

    if (date && nextDate) {
        const daysBetween = differenceInDays(parseISO(nextDate), parseISO(date));

        if (daysBetween > 0) {
           
            for (let i = 1; i < daysBetween; i++) { // Start from 1
                const dateBetween = formatISO9075(addDays(parseISO(date), i)).split(' ')[0];
               
                dataWithoutGaps.push({
                  date: dateBetween,
                  [xLabelKey]: 0,
                });
            }
       
        }
    }
});


return(
        <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">

            
            <LineChart width={730} height={250} data={dataWithoutGaps}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
  <CartesianGrid horizontal={false} strokeWidth="2" stroke="#f55f5" />
  <XAxis dataKey="date"   tickMargin={10} tick={{fill: '#aaa'}} />
  <YAxis tickMargin={10} tick={{fill: '#aaa'}} />
  <Tooltip />


  <Line type="monotone" dataKey={xLabelKey} stroke="#09f" strokeWidth={4} />
</LineChart>
</ResponsiveContainer>
        </div>
    )
}