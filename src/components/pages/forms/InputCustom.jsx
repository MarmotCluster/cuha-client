import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const InputCustom = (props, ref) => {
    const { seto } = useSelector((state) => ({
        seto: state.seto,
    }));

    return (
        <React.Fragment>
            <div className="menu-container__section-form">
                <input
                    className="menu-container__section-form-input"
                    ref={ref}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    autoComplete={props.autoComplete}
                    onChange={props.onChange}
                />
                <p className="menu-container__section-form-title">
                    <span className={seto.language === 1 ? '' : 'en'}>{props.thisName}</span>
                </p>
            </div>

            <div className="menu-container__section-form__error" style={{ height: `${props.errorValue * 2}rem` }}>
                <p className={seto.language === 1 ? '' : 'en'}>{props.errorMessage}</p>
            </div>
        </React.Fragment>
    );
};

export default forwardRef(InputCustom);

{
    /* <div className="menu-container__section-form">
    <input
        className="menu-container__section-form-input"
        ref={(el) => (ref.current[0] = el)}
        type="text"
        name="id"
        value={form.id}
        placeholder=" "
        autoComplete="off"
        onFocus={(e) => funcScrollToMe(e)}
        onChange={(e) => funcOnChange(e)}
    />
    <p className="menu-container__section-form-title">
        <span className={seto.language === 1 ? '' : 'en'}>{translated.section.id.placeholder[seto.language]}</span>
    </p>
</div>; */
}
