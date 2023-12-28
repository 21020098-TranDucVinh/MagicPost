import styles from './RowFlexTwoColumnWithFloat.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const RowFlexTwoColumnWithFloat = ({label, amount})=>{
  return <div className={cx(styles.rowFlexTwoColumnWithFloat)}>
    <p className={cx(styles.left)}>
      {label}:
    </p>
    <p className={cx(styles.right)}>
      {amount}
    </p>
  </div>
}
export  default  RowFlexTwoColumnWithFloat;