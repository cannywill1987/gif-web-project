import React from "react";
import PropTypes from "prop-types";
import CustomImageItem from "../CustomImageItem"
import $ from "jquery";
/*
 * The classic "masonry" style Pinterest grid
 * @prop {number} columns - the number of columns in the grid
 * @prop {number} columnWidth - the fixed width of the columns
 * @prop {number} gutter  - the number of columns in the grid
 * @prop {Array}  items   - the list of items to render
 * 参考 https://github.com/zackargyle/react-image-layout
 */
export default class WaterfallLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {columnHeights: 0};
        this.renderItem = this.renderItem.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            columnHeights: Array.from({length: nextProps.columns}, () => 0)
        };
        // }
        return null;
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (_.isEqual(nextProps, this.props) && _.isEqual(nextProps, this.state)) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    componentDidMount() {
        let self = this;
        $(window).scroll(function () {
            console.log($(window).scrollTop() + $(window).height(), $(document).height());
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
                self.props.onEndReach && typeof self.props.onEndReach === "function" && self.props.onEndReach();
            }
        });
        window.onresize = function () {
        };
    }

    componentWillUnmount() {
        window.onresize = null;
    }

    // clientWidth 处理兼容性
    getClient() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
    }

    /*
     * Get the shortest column in the list of columns heights
     */
    getShortestColumn() {
        const minValue = Math.min(...this.state.columnHeights);
        return this.state.columnHeights.indexOf(minValue);
    }

    /*
     * Determine the top and left positions of the grid item. Update the
     * cached column height.
     * @param {Object} item - the grid item
     * @param {Object} item.height - the grid item's image height
     * @param {Object} item.width - the grid item's image width
     */
    getItemStyle(item) {
        const {columnWidth, gutter} = this.props;
        const shortestColumnIndex = this.getShortestColumn();
        // let marginLeft = 0;
        // if (process.browser === true) {
        //     marginLeft = (this.getClient().width - (columnWidth + gutter) * this.props.columns) / 4;
        //     console.log(marginLeft);
        // }
        const left = (columnWidth + gutter) * shortestColumnIndex;
        const top = this.state.columnHeights[shortestColumnIndex];
        const normalizedHeight = (columnWidth / item.width) * item.height;
        this.state.columnHeights[shortestColumnIndex] += normalizedHeight + gutter;
        return {
            left: `${left}px`,
            top: `${top}px`,
            position: `absolute`,
            width: this.props.columnWidth,
            height: normalizedHeight,
            backgroundColor: item.color,
        };
    }

    /*
     * Render helper for an individual grid item
     * @param {Object} item - the grid item to render
     * @param {Object} item.url - the image src url
     */
    renderItem(item, index) {
        // console.log(index);
        const self = this;
        return (
            <CustomImageItem
                // className="ImageLayout__item"
                src={item.url}
                content={item.content}
                data={item.id}
                // width={this.props.columnWidth}
                onClick={(data) => {
                    self.props.onClickItem && typeof self.props.onClickItem === "function" && self.props.onClickItem(data);
                }}
                index={index}
                styleProps={this.getItemStyle(item)}
                key={index}
                // styles={{backgroundColor: item.color}}
            />
        );
    }

    render() {
        this.width = (this.props.columnWidth + this.props.gutter) * this.props.columns;
        const {items} = this.props;
        return (
            <>
                <div style={{marginTop: this.props.marginTop + "px"}}></div>
                <div className="ImageLayout"
                     style={{position: "relative", width: this.width + "px", ...this.props.stypeProps}}

                >
                    {items.map(this.renderItem)}
                    {/*<div style={{clear: "both"}}/>*/}
                </div>
            </>
        );
    }
}

WaterfallLayout.propTypes = {
    marginTop: PropTypes.number,
    stypeProps: PropTypes.object,
    data: PropTypes.object,
    onEndReach: PropTypes.func,
    // The number of columns in the grid
    columns: PropTypes.number,
    // The fixed width of the columns in the grid
    columnWidth: PropTypes.number,
    // The size of the gutter between images
    gutter: PropTypes.number,
    onClickItem: PropTypes.func,
    // The list of images to render
    items: PropTypes.arrayOf(
        PropTypes.shape({
            height: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
        })
    ).isRequired,
};

WaterfallLayout.defaultProps = {
    marginTop: 0,
    columns: 4,
    columnWidth: 100,
    gutter: 0,
    onClickItem: null,
    stypeProps: {},
};
