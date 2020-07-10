import * as React from 'react';

import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './graphView.css'
import { IGraphData } from '../types/tableData';

interface IProps {
    graphData: IGraphData[];
}

class GraphView extends React.Component<IProps, any> {

    public constructor(props) {
        super(props);
    }
    public render() {
        const xAData = this.props.graphData.map((d) => { return d.id });
        const yData = (this.props.graphData.map((d) => { return d.votes }).sort((a, b) => b - a)[0] / 4);
        const axisdata = [Math.round(yData), Math.round(2 * yData), Math.round(3 * yData), Math.round(4 * yData)];

        return (<div className='graph-container'>
            <ResponsiveContainer
                width={'99%'}
                height={400}>
                <LineChart
                    data={this.props.graphData}
                    margin={{ bottom: 5 }}
                >
                    <CartesianGrid stroke='#f5f5f5' />
                    <CartesianGrid stroke='#f5f5f5' />
                    <CartesianGrid stroke='#f5f5f5' />
                    <Tooltip />
                    <Line dataKey='votes' stroke='blue' fill='blue' />
                    <XAxis dataKey='id' ticks={xAData} label={<AxisLabel height={20} width={50} x={400} y={200} axisType='xAxis'> ID </AxisLabel>} height={100} interval={0} angle={-90} dy={30} />
                    <YAxis dataKey='votes' ticks={axisdata} label={<AxisLabel height={100} width={20} x={12} y={0} axisType='yAxis'>Votes</AxisLabel>} />


                </LineChart>
            </ResponsiveContainer>
        </div>
        );
    }
}
const AxisLabel = ({ axisType, x, y, width, height, children }) => {
    const isVert = axisType === 'yAxis';
    const cx = isVert ? x : x + (width / 2);
    const cy = isVert ? (height / 2) + y : y + height + 10;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
        <text x={cx} y={cy} transform={`rotate(${rot})`} style={{ fontWeight: 'bold' }} textAnchor="middle">
            {children}
        </text>
    );
};
const mapStateToProps = (state: any) => {
    return {
        graphData: state.graph,
    }
}
export default connect(mapStateToProps, null)(GraphView);