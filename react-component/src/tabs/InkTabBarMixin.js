import React from 'react';
import classnames from 'classnames';

export function getScroll(w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    // ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      // quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function offset(elem){
	let box;
	let x;
	let y;
	const doc = elem.ownerDocument;
	const body = doc.body;
	const docElem = doc && doc.documentElement;
	box = elem.getBoundingClientRect();
	x = box.left;
	y = box.top;
	x -= docElem.clientLeft || body.clientLeft || 0;
	y -= docElem.clientTop || body.clientTop || 0;
	const w = doc.defaultView || doc.parentWindow;
	x += getScroll(w);
	y += getScroll(w, true);
	return {
		left: x, top: y,
	};
}


const componentDidUpdate = function(component,isInit){
	const refs = component.refs;
  	const wrapNode = refs.nav || refs.root;
  	console.log('thomas-----',refs);
};

export default {
	getDefaultProps() {
	    return {
	      inkBarAnimated: true,
	    };
	},
	componentDidUpdate(){
		componentDidUpdate(this);
	},
	componentDidMount(){
		componentDidUpdate(this, true);
	},
	getInkBarNode:function(){
		const {
			prefixCls,
			styles,
			inkBarAnimated} = this.props;
		const className = `${prefixCls}-ink-bar`;
		const cls = classnames({
			[className]:true,
			[
				inkBarAnimated
				? `${className}-animated`
				: `${className}-no-animated`
			]:true,
			"tabs-indicator-wrap":true
		});
		//style={styles.inkBar}
		return (
			<div
				key="inkBar"
        		ref="inkBar"
				className={cls}>
				<div className="tabs-indicator"></div>
			</div>
		);
	}
};
