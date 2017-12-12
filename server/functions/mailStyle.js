module.exports = async(type, cont) => {
    let html;
    switch (type) {
        case "captcha":
            html = `
        <div style="width: 500px;border: 1px solid #E2E2E2; box-shadow: 0 0 0 1px #D2D2D2; font-family: Consolas;">
        <div style="height: 40px; line-height:40px; font-size: 14px; color: #555; background: #E2E2E2; padding-left: 1em;" >Write Stroy</div> <div style=" padding: 1em 0 0.5em; font-size: 12px; color: #555; line-height: 26px; text-align: center; ">您正在 Write Story 上${cont.title}，验证码为：</div>
        <div style=" margin-top: 1rem;
        margin-bottom: 1rem; margin-left: auto; margin-right: auto; height: 30px; line-height: 30px; text-align: center; background: #F2F2F2; width: 15rem; color: #666; font-size: 12px; ">${cont.code}</div>
        </div>
        `;
            break;
        default:
            html = cont;
            break;
    }

    return html;
}