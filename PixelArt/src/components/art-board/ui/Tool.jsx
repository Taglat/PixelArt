import cl from './ZTool.module.css';

export function Tool({title, iconSrc, onClick}) {
    return (<div className={cl.tool} title={title} onClick={() => onClick()}>
        <img src={iconSrc} alt={title} />
    </div>)
}