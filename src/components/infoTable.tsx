import * as React from 'react';
import { connect } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { IHits, IPage } from '../types/tableData';
import { removeData, removeNews, updateVote, updateVoteGraph, updateNewsList, updateGraph } from '../actions';
import './infoTable.css'

// interface IProps {
//     list: IHits[];
//     removeNews: (news: any) => null;
//     updateNews: (newsList: any) => null;
//     updateGraph: (graphDate: any) => null;
// }
class InfoTable extends React.Component {
    public pagnationData: IPage;
    public hitsData: IHits[] = [];
    public isLoading: boolean = true;
    public hiddenData: string[] = [];
    public recentVoted = [];

    constructor(props) {
        super(props);
        // localStorage.clear();
        this.hiddenData = JSON.parse(localStorage.getItem('hiddenData')) || [];
        this.recentVoted = JSON.parse(localStorage.getItem('recentVoted')) || [];

        this.pagnationData = {
            page: 0,
            nbHits: 0,
            nbPages: 0,
            hitsPerPage: 20,
        };
        this.fetchData = this.fetchData.bind(this);

    }

    public componentWillMount() {
        this.fetchData(this.pagnationData.page);
    }

    public render() {

        this.hitsData = this.props.list || [];

        return (
            <div className='container'>
                <div className='grid-container-header'>
                    <div className='grid-item-header'>{'Comments'}</div>
                    <div className='grid-item-header'>{'Vote Counts'}</div>
                    <div className='grid-item-header'>{'UpVote'}</div>
                    <div className='grid-item-header-alt'>{'News Detail'}</div>
                </div>

                {!this.isLoading ? this.props.list ? this.props.list.map((hit, i) => {

                    return (
                        <div className={i % 2 ? 'grid-container-alt' : 'grid-container'}>
                            <div className='grid-item'>{hit.num_comments || 0}</div>
                            <div className='grid-item'>{hit.points}</div>
                            <div className='grid-item' onClick={() => this.updateVoteData(hit)}><Icon name={'caret up'} /></div>
                            <div className='grid-item-alt'>
                                <label className='grid-item-alt-sub' style={{ fontSize: '13px' }}>{hit.title || ' Not Available'}
                                    <label className='grid-item-alt-sub' style={{ paddingLeft: 10 }}>{`( ${hit.url || 'URL Not available'} ) by `}
                                        <label className='grid-item-alt-sub' style={{ fontWeight: 'bold' }}>{`${hit.author} `}</label>
                                        <label className='grid-item-alt-sub' style={{ paddingLeft: 5 }}>{this.convertTime(hit.created_at)}
                                            <label className='grid-item-alt-sub' style={{ paddingLeft: 10, fontWeight: 'bold' }} onClick={() => this.updateGraph(hit)}>{'[ Hide ]'}</label></label></label></label>
                            </div>
                        </div>
                    )
                }) : <div className={'grid-container-error'}>
                        <div className='grid-item'>{'No Data Available'}</div></div> :
                    <div className={'grid-container-error'}>
                        <div className='grid-item'><Loader active /></div></div>}
                <div className='grid-container-footer'>
                    <div className='grid-item-footer'>
                        <label className={'text-footer'} onClick={() => this.fetchData(this.pagnationData.page - 1)}>{'Previous'}</label>
                        <label className={'text-footer'}>{' | '}</label>
                        <label className={'text-footer'} onClick={() => this.fetchData(this.pagnationData.page + 1)} > {'Next'}</label></div>
                </div>
            </div >
        );
    }

    public async fetchData(page) {
        this.isLoading = true;
        const url = `http://hn.algolia.com/api/v1/search?page=${page}`;

        if (page >= 0 && this.pagnationData.nbPages >= page) {

            const data = await fetch(url, { method: 'GET' });

            const response = await data.json();
            this.isLoading = false;
            if (response) {

                this.hitsData = this.updateWithStoredData(response.hits);

                this.pagnationData = {
                    page: response.page,
                    nbHits: response.nbHits,
                    nbPages: response.nbPages,
                    hitsPerPage: response.hitsPerPage,

                };
                const graphData = this.hitsData.map((h) => { return { id: h.objectID, votes: h.points } });
                this.props.updateNews(this.hitsData);
                this.props.updateGraph(graphData);

            }
        }

    }

    public updateWithStoredData = (news: IHits[]) => {
        const cloneNews = [...news];
        const newData: IHits[] = [];
        const updateVoteData = cloneNews.map((c, j) => {
            const voted = this.recentVoted && this.recentVoted.find((h) => h.id === c.objectID);
            if (voted) {
                const news = { ...c, points: voted.votes };
                return news;
            } else { return c; }
        });
        updateVoteData.forEach((c, i) => {
            const hidden = this.hiddenData && this.hiddenData.find((h) => h === c.objectID);
            if (!hidden) {
                newData.push(c);
            }
        });
        return newData;
    }

    public updateGraph = (payload) => {
        this.hiddenData.push(payload.objectID);
        localStorage.setItem('hiddenData', JSON.stringify(this.hiddenData));
        this.props.removeNews(payload);
        this.props.removeData({ id: payload.objectID, votes: payload.points });
    }

    public updateVoteData = (payload) => {
        const graphData = { id: payload.objectID, votes: payload.points };
        this.storeUpdatedVote(payload);

        this.props.updateVote(payload);
        this.props.updateVoteGraph(graphData);
    }

    public storeUpdatedVote = (payload) => {
        const graphData = { id: payload.objectID, votes: payload.points + 1 };
        const index = this.recentVoted.findIndex((r) => r.id === payload.objectID);

        if (index >= 0) {

            this.recentVoted.splice(index, 1, graphData);

        } else {
            this.recentVoted.push(graphData);
        }
        localStorage.setItem('recentVoted', JSON.stringify(this.recentVoted));
    }

    public convertTime = (time) => {
        const now = new Date();
        const createdTime = new Date(time);
        const year = now.getFullYear() === createdTime.getFullYear();
        const month = now.getMonth() === createdTime.getMonth();
        const date = now.getDate() === createdTime.getDate();
        const hours = createdTime.getHours();
        const min = createdTime.getMinutes();

        const finalTime = year ?
            month ?
                date ?
                    hours <= 1 ?
                        min + ' minutes ago' : hours + ' hours' : now.getDate() - createdTime.getDate() + ' days ago'
                : now.getMonth() - createdTime.getMonth() + ' months ago'
            : 'on ' + createdTime.toDateString();
        // const finalTime = min > 60 ? `${new Date(now - time).getHours()} hours` : `${min} minutes`
        return finalTime;
    }
}

const mapDispatchToProps = (dispatch: any) => (
    {
        updateVote: (news: any) => dispatch(updateVote(news)),
        updateVoteGraph: (news: any) => dispatch(updateVoteGraph(news)),
        removeNews: (news: any) => dispatch(removeNews(news)),
        removeData: (news: any) => dispatch(removeData(news)),
        updateNews: (newsList: any) => dispatch(updateNewsList(newsList)),
        updateGraph: (graphDate: any) => dispatch(updateGraph(graphDate))
    }
);
const mapStateToProps = (state: any, props: any) => {
    return {
        list: state.news,
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoTable);