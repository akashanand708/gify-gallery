import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import './slideShow.scss';
import Icon from '@material-ui/core/Icon';
import TrendingGif from '../TrendingGifs/TrendingGif/TrendingGif';
import { SLIDE_SHOW } from '../Constants';


class SlideShow extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            clickedImageIndex: props.clickedImageIndex,
            clickedNavigation: ''
        }
        this.elementRef = React.createRef();
    }

    handleClickOutside = (event) => {
        const closeModal = (get(event, 'target.dataset.close', 'true') === 'true');
        if (closeModal) {
            this.props.closeSlideShowModal();
        }
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    onClickNavigation = (callBack) => {
        const { clickedImageIndex } = this.state;
        const { trendingGifs } = this.props;
        this.setState(callBack(clickedImageIndex, trendingGifs.length))
        setTimeout(()=>{
            this.setState({clickedNavigation:''})
        },500)
    }

    previousCallBack = (clickedImageIndex = 0, trendingGifsLength) => {
        if (clickedImageIndex === 0) {
            clickedImageIndex = trendingGifsLength - 1;
        } else {
            clickedImageIndex -= 1;
        }
        return {clickedImageIndex,clickedNavigation:'previous'};
    }

    nextCallBack = (clickedImageIndex = 0, trendingGifsLength) => {
        if (clickedImageIndex === trendingGifsLength - 1) {
            clickedImageIndex = 0;
        } else {
            clickedImageIndex += 1;
        }
        return {clickedImageIndex,clickedNavigation:'next'};
    }
    render() {
        const { trendingGifs } = this.props;
        const { clickedImageIndex, clickedNavigation } = this.state;
        const trendingGif = trendingGifs[clickedImageIndex];
        return (
            <div className="slide-show-container">
                <div data-close={false} className="slide-show-icon" onClick={() => this.onClickNavigation(this.previousCallBack)} title="Previous">
                    <Icon data-close={false} fontSize="large">navigate_before</Icon>
                </div>
                <div className={`trendingImage ${clickedNavigation}-animation-style`}>
                    <TrendingGif
                        trendingGif={trendingGif}
                        fromWhere={SLIDE_SHOW}
                    />
                </div>
                <div data-close={false} className="slide-show-icon" onClick={() => this.onClickNavigation(this.nextCallBack)} title="Next">
                    <Icon data-close={false} fontSize="large">navigate_next</Icon>
                </div>
                <div data-close={false} className="close slide-show-icon" onClick={this.props.closeSlideShowModal} title="Close">
                    <Icon data-close={false} fontSize="large">close</Icon>
                </div>
            </div>
        )
    }
}
SlideShow.propTypes = {
    trendingGifs: PropTypes.arrayOf(PropTypes.object),
    clickedImageIndex: PropTypes.number,
    closeSlideShowModal: PropTypes.func
}

SlideShow.defaultProps = {
    trendingGifs: [],
    clickedImageIndex: 0,
    closeSlideShowModal: noop
}
export default React.memo(SlideShow);