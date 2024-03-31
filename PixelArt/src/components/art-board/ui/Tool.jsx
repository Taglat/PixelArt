import clsx from 'clsx';
import cl from './ZTool.module.css';

export function Tool({title, iconSrc, onClick, selected}) {
    return (<div className={clsx(cl.tool, selected && cl.active)} title={title} onClick={() => onClick()}>
        <img src={iconSrc} alt={title} />
    </div>)
}