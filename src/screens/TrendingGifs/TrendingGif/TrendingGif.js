import React from 'react';
import PropTypes from 'prop-types';
import { get, noop } from 'lodash';
import './trendingGif.scss';
import { CircularProgress } from '@material-ui/core';
import { SLIDE_SHOW } from '../../Constants';

class TrendingGif extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isImageLoading: true,
            errorInLoading: ''
        }
    }
    imageOnloadCallback = () => {
        this.setState({ isImageLoading: false });
    }

    imageOnErrorCallback = () => {
        this.setState({ isImageLoading: false, errorInLoading: 'Error in loading image' });
    }
    render() {
        const { isImageLoading, errorInLoading } = this.state;
        const { trendingGif: { title }, indexOfImage, fromWhere } = this.props;
        const isFromSlideShow = fromWhere === SLIDE_SHOW;
        const { url, height, width } = get(this.props, 'trendingGif.images.original', {});

        let imageStyle = { width: '100%', height: 'inherit' }
        const screenWidth = window.screen.width;
        if(screenWidth < 900){
            imageStyle = {};
        }
        if (screenWidth > 900 && isFromSlideShow && width > height) {
            imageStyle.width = '70%';
            imageStyle.height = 'unset';
        } else if (screenWidth > 900 && isFromSlideShow && width <= height) {
            imageStyle.width = 'unset';
            imageStyle.height = '96%';
        }
        return (
            <div className={`masonry-brick ${isFromSlideShow ? 'masonry-brick-slideshow' : ''}`}>
                {
                    errorInLoading === ''
                        ? <img
                            style={imageStyle}
                            data-close={false}
                            className={`${isFromSlideShow ? 'masonry-img-slideshow' : 'masonry-img'} ${isImageLoading ? 'imageLoading' : 'imageLoaded'}`}
                            src={url}
                            alt={title}
                            onLoad={this.imageOnloadCallback}
                            onError={this.imageOnErrorCallback}
                            onClick={() => this.props.onClickImage(indexOfImage)}
                        />
                        : <div className="errorInLoading">{errorInLoading}</div>
                }
                {
                    isImageLoading &&
                    <CircularProgress className={"imageLoadingCircularProgress"} />
                }
            </div>
        )
    }
}
TrendingGif.propTypes = {
    trendingGif: PropTypes.object,
    indexOfImage: PropTypes.number,
    fromWhere: PropTypes.string,
    onClickImage: PropTypes.func,
}
TrendingGif.defaultProps = {
    trendingGif: {},
    fromWhere: '',
    indexOfImage: 0,
    onClickImage: noop
}
export default React.memo(TrendingGif);