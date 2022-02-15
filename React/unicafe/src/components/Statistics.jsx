import StatisticLine from "./StatisticLine";

const Statistics = ({good, neutral, bad}) => {

    const totalVotes = good + neutral + bad

    return(
        <>
            <h2>statistics</h2>
            {
                totalVotes?
                    <table>
                        <tbody>
                            <StatisticLine text='good' value={good} />
                            <StatisticLine text='neutral' value={neutral} />
                            <StatisticLine text='bad' value={bad} />
                            <StatisticLine text='all' value={totalVotes} />
                            <StatisticLine text='average' value={((good * 1) + (bad * -1)) / totalVotes} />
                            <StatisticLine text='positive' value={((good / totalVotes) * 100) + ' %'} />
                        </tbody>
                    </table>
                :
                    <div>No feedback given</div>
            }
        </>
    )
}

export default Statistics;