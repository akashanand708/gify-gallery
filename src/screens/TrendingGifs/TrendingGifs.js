import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'lodash';
import * as trendingGifsActions from '../../actions/trendingGifs-actions';
import CommonLoader from '../../component/CommonLoader/CommonLoader';
import TrendingGif from './TrendingGif/TrendingGif';
import './trendingGifs.scss';
import SlideShow from '../SlideShow/SlideShow';
import { SUCCESS_CODE } from '../Constants';
import { ERROR } from '../../constants/message';

class TrendingGifs extends React.PureComponent {

    constructor (props){
        super(props);
        this.state = {
            clickedImageIndex:0,
            isSlideShowOpen: false
        }
    }
    componentDidMount() {
        this.fetchTrendingGifs();
    }

    fetchTrendingGifs = () => {
        this.props.getTrendingGifs();
    }

    closeSlideShowModal = () =>{
        this.setState({isSlideShowOpen:false})
    }
    onClickImage = (clickedImageIndex) => {
        this.setState({isSlideShowOpen:true,clickedImageIndex})
    }
    renderTrendingGifs = () => {
        const {awitingData, trendingGifs} = this.props;
        const { data: trendingGifList } = trendingGifs
        let { status, msg } = get(this.props,'trendingGifs.meta',{});
        if(!awitingData && status !== SUCCESS_CODE){
            return <div className="errorMessage">{msg ? msg: ERROR.SOMETHING_WENT_WRONG}</div>
        }
        if (Array.isArray(trendingGifList) && trendingGifList.length > 0) {
            return (
                <div className={"trendingGifs masonry"}>
                    {
                        trendingGifList.map((trendingGif, index) => {
                            return (
                                <TrendingGif
                                    key={trendingGif.id}
                                    indexOfImage={index}
                                    trendingGif={trendingGif}
                                    onClickImage={this.onClickImage}
                                />
                            )
                        })
                    }
                </div>
            )
        }
        if(!awitingData){
            return (
                <div className="emptyList">List is Empty</div>
            )
        }
        return null;
        
    }
    render() {
        const { awitingData } = this.props;
        const { data: trendingGifList } = this.props.trendingGifs;
        const { isSlideShowOpen, clickedImageIndex } = this.state;
        return (
            <>
                <CommonLoader
                    showLoader={awitingData}
                />
                <div className="trendingGifContainer">
                    <div className="trendingGifsContent">
                        {
                            this.renderTrendingGifs()
                        }
                    </div>
                    {
                        isSlideShowOpen &&
                        <SlideShow
                            trendingGifs={trendingGifList}
                            clickedImageIndex={clickedImageIndex}
                            closeSlideShowModal={this.closeSlideShowModal}
                        />
                    }
                    <div className="author">
                        <span className="authorTitle">Developed by:</span><span>Akash Anand (akashanand110390@gmail.com)</span>
                    </div>
                </div>
            </>
        )
    }
}

TrendingGifs.propTypes = {
    getTrendingGifs: PropTypes.func.isRequired,
    trendingGifs: PropTypes.arrayOf(PropTypes.object).isRequired,
    awitingData: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    trendingGifs: get(state, 'trendingGifReducer.trendingGifs', []),
    awitingData: state.trendingGifReducer.awitingData
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(trendingGifsActions, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(TrendingGifs));
