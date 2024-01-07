
import { Pie, PieChart, ResponsiveContainer, Legend, Tooltip, Cell } from "recharts";
import useAssets from "../hooks/useAssets";

const PieCharts = () => {
    const [assets] = useAssets();

    // Aggregate data based on productType
    const aggregatedData = assets.reduce((acc, item) => {
        const productType = item.productType;
        acc[productType] = (acc[productType] || 0) + item.quantity;
        return acc;
    }, {});

    // Convert aggregated data to an array of objects
    const pieChartData = Object.keys(aggregatedData).map((productType) => ({
        name: productType,
        value: aggregatedData[productType],
    }));

    // Calculate total quantity
    const totalQuantity = pieChartData.reduce((total, entry) => total + entry.value, 0);

    // Define colors for returnable and non-returnable
    const colors = ["#3559E0", "#00B6FF"]; // You can customize the colors
    

    return (
        <div>
            
            <ResponsiveContainer width="100%" height={200}>
                <PieChart >
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${(value / totalQuantity * 100).toFixed(2)}%`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieCharts;
