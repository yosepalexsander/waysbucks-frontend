/* eslint-disable max-len */
import type { SVGProps } from 'react';
import { memo } from 'react';

export { FaBars as MenuIcon } from 'react-icons/fa';
export { FaInstagram as InstagramIcon } from 'react-icons/fa';
export { FaGithub as GithubIcon } from 'react-icons/fa';
export { FaLinkedin as LinkedinIcon } from 'react-icons/fa';
export { FaCheckCircle as CheckIcon } from 'react-icons/fa';
export { FaExclamationCircle as ErrorIcon } from 'react-icons/fa';
export { FaExclamationTriangle as WarningIcon } from 'react-icons/fa';
export { FaShoppingCart as CartIcon } from 'react-icons/fa';
export { FaCoffee as CoffeeIcon } from 'react-icons/fa';
export { FaFemale as FemaleIcon } from 'react-icons/fa';
export { FaMale as MaleIcon } from 'react-icons/fa';
export { GoSignOut as LogoutIcon } from 'react-icons/go';
export { MdClose as CloseIcon } from 'react-icons/md';
export { MdAccountCircle as AccountIcon } from 'react-icons/md';
export { MdAdd as PlusIcon } from 'react-icons/md';
export { MdRemove as MinusIcon } from 'react-icons/md';
export { MdDelete as DeleteIcon } from 'react-icons/md';
export { MdAttachFile as AttachmentIcon } from 'react-icons/md';
export { MdDashboard as DashboardIcon } from 'react-icons/md';

interface IconProps extends SVGProps<SVGSVGElement> {
  title?: string;
  titleId?: string;
}

export const Search = memo(function Search({ title, titleId, ...props }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 50 50"
      fill="#374151"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby={titleId}
      {...props}>
      <title id={titleId}>{title}</title>
      <path d="M21 3C11.602 3 4 10.602 4 20s7.602 17 17 17c3.355 0 6.46-.984 9.094-2.656l12.281 12.281 4.25-4.25L34.5 30.281C36.68 27.421 38 23.88 38 20c0-9.398-7.602-17-17-17Zm0 4c7.2 0 13 5.8 13 13s-5.8 13-13 13S8 27.2 8 20 13.8 7 21 7Z" />
    </svg>
  );
});

export const BrandLogo = memo(function BrandLogo({ title, titleId, width, height, ...props }: IconProps) {
  return (
    <svg
      width={width ?? '100%'}
      height={height ?? '100%'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-labelledby={titleId}
      {...props}>
      <title id={titleId}>{title}</title>
      <path
        d="M11.407.51a11.544 11.544 0 0 0-9.629 6.189A11.428 11.428 0 0 0 .615 13.6c.613 4.274 3.642 7.874 7.772 9.237.86.285 1.727.46 2.685.547.461.04 1.446.04 1.907 0a11.543 11.543 0 0 0 9.293-6.169 11.433 11.433 0 0 0 .696-8.876A11.529 11.529 0 0 0 11.408.51Zm1.623.107a11.429 11.429 0 0 1 7.791 4.058 11.299 11.299 0 0 1 2.557 5.818c.074.572.085.784.085 1.465 0 .68-.011.892-.085 1.465-.36 2.84-1.812 5.452-4.062 7.312-2.635 2.178-6.154 3.057-9.547 2.383a11.45 11.45 0 0 1-7.584-5.34 11.384 11.384 0 0 1-1.572-4.889c-.03-.345-.04-1.175-.019-1.55.18-3.052 1.506-5.804 3.784-7.852A11.458 11.458 0 0 1 10.552.67c.28-.034.443-.05.92-.083a21.3 21.3 0 0 1 1.559.03Z"
        fill="#CD1818"
      />
      <path
        d="M11.412 1.272A10.768 10.768 0 0 0 2.003 8.05a10.942 10.942 0 0 0-.703 2.993c-.04.435-.04 1.394 0 1.83.204 2.193 1.022 4.195 2.388 5.851a10.743 10.743 0 0 0 6.805 3.826c.553.08.88.102 1.533.102.785 0 1.35-.051 2.052-.187a10.788 10.788 0 0 0 7.769-6.124 10.82 10.82 0 0 0 .904-3.469c.04-.435.04-1.394 0-1.829a10.865 10.865 0 0 0-.53-2.515 10.728 10.728 0 0 0-4.472-5.635 10.813 10.813 0 0 0-6.337-1.621Zm.85 1.057c.525.025.65.04.796.095.22.081.313.213.313.44 0 .217-.078.33-.28.413L13 3.313l.08.029a.55.55 0 0 1 .272.237c.05.1.05.296.002.425a.53.53 0 0 1-.294.28c-.17.062-.33.069-.94.04a12.834 12.834 0 0 1-.57-.032 71.12 71.12 0 0 1 .079-1.816l.01-.173h.061c.034 0 .286.012.562.026Zm-1.523.147.069.022.005.261.005.26-.065-.013a1.724 1.724 0 0 0-.617-.023c-.153.023-.206.054-.206.116 0 .083.048.1.37.128.174.015.33.037.397.057.3.093.44.29.422.595a.536.536 0 0 1-.182.39c-.254.252-.828.377-1.306.285l-.087-.017-.012-.254a1.956 1.956 0 0 1-.004-.264c.006-.005.07 0 .142.014.208.037.516.03.662-.016.137-.042.166-.066.157-.133-.007-.07-.054-.083-.373-.114-.427-.04-.608-.112-.726-.286a.55.55 0 0 1-.097-.352c-.001-.24.133-.427.39-.55.104-.048.333-.11.494-.133a2.6 2.6 0 0 1 .563.027Zm3.828.16c.158.052.286.1.286.106 0 .005-.088.27-.196.584-.165.485-.196.592-.196.678 0 .071.01.12.033.156.044.07.173.132.286.134.075 0 .095-.007.143-.051.073-.07.102-.14.312-.768.1-.3.189-.545.196-.545.017 0 .558.181.579.193.02.014-.373 1.169-.447 1.304-.223.42-.703.527-1.245.275-.38-.176-.557-.463-.506-.812.023-.14.428-1.35.453-1.35.009 0 .145.043.302.095Zm-5.95.967-.034.714.164.322c.088.178.161.327.161.332 0 .009-.536.28-.553.28-.005 0-.082-.148-.169-.33l-.158-.326-.59-.405a16.548 16.548 0 0 1-.59-.413c0-.012.556-.288.58-.288.01 0 .147.098.303.217.157.12.293.223.305.23.017.01.022-.066.02-.374l-.004-.386.296-.146c.164-.08.298-.146.298-.144.002.002-.012.324-.029.717Zm8.732.3c.306.103.64.362.809.63l.034.052-.176.124-.226.164-.055.04-.051-.09a.917.917 0 0 0-.346-.333.452.452 0 0 0-.39-.017.7.7 0 0 0-.28.297.394.394 0 0 0-.052.226c0 .11.007.14.048.209.09.152.303.274.552.318.063.012.117.022.119.024.005.003-.18.503-.19.515-.02.017-.232-.05-.38-.117-.703-.329-.967-.884-.682-1.446.163-.324.417-.548.712-.629.143-.039.383-.024.553.032Zm-9.977 1.21c.285.171.514.317.511.324a4.571 4.571 0 0 1-.232.203c-.156.13-.235.186-.253.18a3.768 3.768 0 0 1-.169-.095 1.396 1.396 0 0 0-.15-.085 7.87 7.87 0 0 0-.494.415c-.01.014.009.08.058.193.061.147.07.176.05.197-.104.1-.452.377-.46.367a82.142 82.142 0 0 1-.764-1.958l.31-.26.305-.255.385.232.903.542Zm11.67.173.204.24-.313.265c-.172.145-.307.266-.299.27.007.002.213-.02.459-.047.243-.028.461-.052.485-.052.04 0 .08.042.467.496.013.015.022.032.019.036-.004.003-.273.023-.6.045l-.591.04-.017.059-.145.586c-.07.288-.133.538-.141.554-.009.022-.063-.033-.252-.253l-.239-.281.133-.466c.075-.255.131-.467.128-.472a4.362 4.362 0 0 0-.31.25c-.223.19-.309.254-.326.243a3.413 3.413 0 0 1-.21-.236l-.188-.218.046-.046c.065-.061 1.47-1.252 1.478-1.252.004 0 .1.109.212.24Zm-6.216-.01c1.25.15 2.397.608 3.381 1.348a7.389 7.389 0 0 1 1.486 1.524c.58.819.97 1.74 1.153 2.726.085.455.104.68.104 1.245 0 .696-.052 1.112-.213 1.727a6.729 6.729 0 0 1-1.867 3.193c-1.12 1.089-2.473 1.73-4.06 1.925a9.46 9.46 0 0 1-1.551 0 6.959 6.959 0 0 1-3.22-1.22 7.344 7.344 0 0 1-1.527-1.472 6.878 6.878 0 0 1-1.363-3.383 6.207 6.207 0 0 1-.03-.77c0-.402.008-.583.03-.771a6.876 6.876 0 0 1 1.107-3.023c.295-.44.557-.752.96-1.144 1.18-1.146 2.658-1.802 4.358-1.937.203-.015 1.032.005 1.252.032ZM5.282 6.387c.388.401.707.735.71.742.002.007-.073.139-.167.291-.127.208-.178.276-.2.271a26.448 26.448 0 0 1-.626-.19c-.327-.1-.596-.18-.6-.179-.001.003.2.213.447.47.29.299.448.473.441.49-.019.05-.322.529-.339.536a57.988 57.988 0 0 1-1.964-.595c-.008-.007.11-.207.286-.486l.06-.095.545.237c.3.13.564.244.588.252.024.01-.162-.187-.412-.436-.253-.251-.457-.461-.457-.47 0-.02.361-.603.373-.603.007 0 .286.092.624.204.4.132.6.191.579.17l-.49-.406c-.318-.26-.456-.384-.449-.401.017-.046.322-.532.334-.532.005 0 .329.329.717.73Zm15.114.911c.294.144.553.637.598 1.138l.012.127-.239.063c-.131.034-.25.063-.264.063-.019 0-.026-.038-.034-.158a1.606 1.606 0 0 0-.124-.52c-.055-.122-.09-.157-.155-.149-.077.009-.085.085-.041.337.02.115.04.256.046.314.022.216-.058.459-.186.555a.758.758 0 0 1-.347.14c-.26.026-.518-.14-.704-.45-.141-.237-.264-.648-.252-.85l.005-.09.239-.064c.13-.036.242-.065.247-.065.005 0 .018.085.029.187.025.228.075.418.148.559.068.135.128.183.187.156a.11.11 0 0 0 .055-.063 1.645 1.645 0 0 0-.028-.283c-.049-.31-.049-.515.002-.647.116-.31.497-.452.806-.3ZM3.022 12.222c.189.049.436.195.586.349l.071.074-.097.03c-.138.041-.32.133-.43.216-.052.039-.095.064-.098.054a2.09 2.09 0 0 0-.07-.122 1.021 1.021 0 0 0-.565-.434.703.703 0 0 1-.11-.042c-.015-.015.082-.081.17-.115.142-.058.345-.06.543-.01Zm18.554 0c.102.034.218.107.2.125a.698.698 0 0 1-.11.043 1.021 1.021 0 0 0-.565.433 2.04 2.04 0 0 0-.07.122c-.003.01-.046-.015-.097-.054a1.605 1.605 0 0 0-.431-.217l-.097-.029.072-.074c.192-.197.47-.34.737-.381.085-.014.274.003.361.032Zm-19.25.284c.28.095.457.232.561.44l.06.116-.077.085a1.568 1.568 0 0 0-.288.487l-.054.155-.094-.099c-.31-.325-.438-.745-.327-1.07.027-.081.07-.154.089-.154.006 0 .066.018.13.04Zm19.625.048c.158.315.034.787-.3 1.136l-.094.099-.054-.155a1.566 1.566 0 0 0-.288-.487l-.077-.085.06-.117a.854.854 0 0 1 .35-.352c.112-.058.306-.126.338-.122.014.002.043.039.065.083Zm-17.739.272c.053.024.097.051.097.06 0 .037-.107.322-.148.391a.902.902 0 0 1-.57.398 1.029 1.029 0 0 0-.396.181c-.168.126-.264.276-.374.583l-.012.034-.027-.034c-.121-.156-.159-.434-.092-.676.064-.235.187-.43.386-.621.188-.178.332-.265.552-.332.182-.056.441-.05.584.016Zm16.226-.021c.217.06.38.155.57.337.2.191.323.386.388.621.066.242.029.52-.092.676l-.028.034-.011-.034c-.111-.307-.207-.457-.375-.583-.121-.09-.24-.144-.396-.18a.902.902 0 0 1-.57-.399 2.071 2.071 0 0 1-.148-.391c0-.019.124-.08.199-.097.12-.028.33-.02.463.016Zm-15.912.333c.231.493-.169 1.237-.796 1.477a1.056 1.056 0 0 1-.512.071c-.128-.022-.295-.095-.285-.123.005-.012.03-.085.055-.163a.903.903 0 0 1 .27-.413c.118-.092.184-.122.372-.175.204-.057.306-.106.43-.206.132-.105.244-.271.318-.464.064-.175.066-.175.148-.004Zm15.182.005c.073.192.185.358.317.463.124.1.226.149.43.206.188.053.254.083.372.175.114.09.213.242.27.413l.055.163c.01.028-.157.101-.284.123a1.055 1.055 0 0 1-.513-.07 1.43 1.43 0 0 1-.813-.854c-.054-.168-.06-.426-.015-.551.027-.07.107-.22.12-.22.003 0 .03.068.06.152Zm-2.618 5.14c.073.107.13.2.13.209 0 .007-.168.127-.374.264-.206.14-.378.258-.383.264a.985.985 0 0 0 .12.202c.004.003.128-.073.275-.171l.313-.205.045-.029.13.195c.072.107.13.201.13.208 0 .009-.127.102-.284.207-.159.105-.293.198-.302.205-.022.02.113.22.142.21.012-.005.185-.119.386-.254.2-.136.37-.246.379-.246.013 0 .275.378.275.397 0 .01-1.26.858-1.286.867-.015.005-1.107-1.589-1.119-1.635-.005-.015 1.252-.879 1.283-.88.005-.002.068.086.14.193Zm-9.706.035c.25.064.572.269.755.48.115.133.18.233.165.255a5.57 5.57 0 0 1-.44.306.446.446 0 0 1-.061-.093.992.992 0 0 0-.346-.337.46.46 0 0 0-.383-.01c-.158.07-.319.293-.34.474-.018.139.02.23.137.347.121.12.25.187.433.224.071.015.134.03.136.032a2.56 2.56 0 0 1-.092.26c-.076.197-.105.255-.13.255-.049 0-.299-.097-.42-.163-.451-.245-.7-.586-.702-.957a.89.89 0 0 1 .123-.474c.158-.301.415-.527.685-.6.119-.03.356-.032.48 0Zm8.155.994c.045.122.075.227.069.233a8.23 8.23 0 0 1-.435.17c-.233.086-.422.164-.422.174 0 .033.073.215.085.215.007 0 .095-.03.198-.069.102-.039.255-.095.34-.125l.157-.056.087.228c.048.127.085.232.083.234-.003.002-.155.06-.337.127a9.097 9.097 0 0 0-.346.134c-.018.019.067.23.094.229.012-.002.213-.073.445-.16.231-.086.424-.154.427-.15.01.015.164.433.164.449 0 .021-1.448.555-1.465.538a34.35 34.35 0 0 1-.356-.93c-.266-.704-.34-.918-.322-.928a48.301 48.301 0 0 1 1.436-.535c.01-.002.054.098.098.222Zm-6.312-.038c.35.084.646.297.782.563.133.259.114.631-.044.945a1.004 1.004 0 0 1-1.138.549c-.365-.075-.683-.297-.82-.573a.794.794 0 0 1-.086-.41c-.002-.533.374-1.016.851-1.095.116-.02.325-.009.455.021Zm4.602.554.03.253.01.101-.44.055-.45.054c-.005 0-.003.06.007.135.019.161-.025.151.41.095.17-.022.31-.039.31-.037.01.008.062.484.053.493-.005.005-.16.029-.347.052-.186.024-.339.044-.34.046-.004.002.013.149.037.325.022.178.039.334.036.347-.004.019-.072.034-.302.063-.163.02-.303.03-.308.025a56.917 56.917 0 0 1-.245-1.964c.01-.012 1.364-.185 1.458-.188l.06-.002.021.147Zm-2.514-.022c.402.043.734.08.74.085a3.19 3.19 0 0 1-.045.488 3.03 3.03 0 0 1-.427-.029c-.23-.024-.43-.042-.447-.042-.022 0-.03.025-.039.127a.702.702 0 0 0-.005.137c.005.003.16.022.348.042.185.019.34.037.344.04.006.008-.043.485-.051.494a6.042 6.042 0 0 1-.336-.03 4.078 4.078 0 0 0-.35-.026c-.013.005-.032.134-.05.335a4.17 4.17 0 0 1-.043.34c-.014.016-.584-.037-.605-.055-.008-.009.026-.415.084-.998.085-.833.104-.982.128-.982.013 0 .354.034.754.074Z"
        fill="#CD1818"
      />
      <path
        d="M12.223 2.96c-.005.099-.008.18-.007.184.006.005.268.01.35.008a.177.177 0 0 0 .107-.05c.043-.036.053-.058.054-.116.002-.146-.06-.183-.337-.196l-.155-.007-.012.178ZM12.196 3.577c0 .04-.005.124-.012.186l-.01.116h.225c.267 0 .313-.016.344-.119.025-.085-.004-.16-.077-.198-.043-.022-.267-.05-.44-.054-.023-.002-.03.013-.03.07ZM6.088 4.99c.087.227.259.616.269.613.022-.009.301-.24.303-.253a3.19 3.19 0 0 0-.291-.2c-.16-.104-.288-.176-.281-.16ZM13.858 7.574c-.087.051-.13.132-.13.248 0 .32.325.743.708.921.107.05.134.054.276.056.143 0 .16-.003.2-.043.07-.064.094-.123.094-.233 0-.307-.303-.713-.67-.895a.605.605 0 0 0-.284-.084c-.112-.007-.136-.004-.194.03ZM7.92 8.887c-.185.02-.359.11-.53.273-.222.21-.36.433-.434.697a1.814 1.814 0 0 0-.001.678c.11.4.352.765.691 1.045l.111.09.056-.156.057-.156-.116-.112c-.413-.393-.588-.87-.482-1.31.07-.289.23-.51.442-.617.328-.163.658-.092.992.213l.097.088.09-.13.09-.13-.093-.083a1.666 1.666 0 0 0-.71-.376.608.608 0 0 0-.26-.014ZM9.956 9.119c-.024.036-.027.066-.019.15.005.06.02.141.033.184l.022.074.16.01a2.362 2.362 0 0 1 1.499.676c.414.41.543.786.545 1.567.002.682.053.88.264 1.025.165.113.404.172.82.203.478.035.917-.036 1.323-.219l.117-.052-.056-.071a13.735 13.735 0 0 0-1.189-1.318c-.964-.955-1.887-1.662-2.667-2.041-.336-.163-.49-.213-.675-.224-.145-.008-.148-.008-.177.036Z"
        fill="#CD1818"
      />
      <path
        d="M9.33 9.92c-.537.766-.978 1.71-1.144 2.448a3.954 3.954 0 0 0-.042 1.648c.202.995.98 1.96 1.959 2.43.502.24.982.337 1.573.317.56-.02 1.038-.126 1.644-.363a8.766 8.766 0 0 0 1.685-.91c.09-.064.104-.079.076-.087a4.14 4.14 0 0 1-.526-.234c-1.572-.806-3.71-2.867-4.698-4.527a6.206 6.206 0 0 1-.36-.708.716.716 0 0 0-.06-.132c-.007-.009-.055.045-.106.118Zm1.844 2.937c.424.108.714.391.838.823.032.11.04.171.037.37 0 .201-.008.262-.045.406a2.194 2.194 0 0 1-.994 1.275c-.3.173-.68.27-.993.253a1.187 1.187 0 0 1-.526-.14c-.547-.267-.765-.92-.538-1.61.117-.362.38-.732.686-.972.49-.383 1.043-.529 1.535-.405Z"
        fill="#CD1818"
      />
      <path
        d="M10.661 12.94c-.642.078-1.274.564-1.541 1.187-.2.468-.18.949.054 1.29a.9.9 0 0 0 .39.328c.205.1.356.132.588.12.799-.042 1.52-.647 1.74-1.46.031-.11.038-.181.038-.372-.002-.21-.007-.253-.046-.375-.141-.427-.504-.693-.983-.723a1.62 1.62 0 0 0-.24.005Zm.394.383c.01.01.005.047-.02.108-.02.051-.047.161-.06.246-.03.178-.063.262-.147.356-.088.101-.208.159-.392.188-.206.032-.294.062-.419.142-.253.162-.374.36-.434.71-.038.213-.044.223-.102.149-.182-.238-.18-.661.008-1.029.148-.293.465-.614.74-.748.097-.05.272-.109.385-.132.097-.019.417-.014.44.01Zm.405.29c.182.29.148.71-.092 1.109a2.13 2.13 0 0 1-.538.552c-.26.168-.554.254-.797.235-.16-.011-.195-.023-.177-.06.042-.095.074-.214.09-.332a.604.604 0 0 1 .182-.382c.099-.09.19-.13.35-.152.272-.039.415-.105.587-.278.153-.152.22-.284.262-.527.051-.284.055-.29.133-.165Z"
        fill="#CD1818"
      />
      <path
        d="M10.56 13.45a1.329 1.329 0 0 0-.652.384 1.408 1.408 0 0 0-.32.436c-.09.186-.117.305-.117.508l.001.17.046-.136c.137-.395.452-.646.884-.705.157-.022.273-.076.344-.163.063-.076.094-.157.12-.318.01-.066.024-.139.029-.166l.01-.046-.107.002c-.06 0-.167.015-.237.034ZM11.423 13.917c-.007.04-.043.134-.08.21a1.14 1.14 0 0 1-.437.452c-.114.06-.332.122-.429.122-.127.002-.294.112-.36.241a.757.757 0 0 0-.05.19 2.168 2.168 0 0 1-.051.254c0 .025.276-.004.391-.043.225-.072.396-.176.581-.348.329-.309.515-.739.462-1.064l-.014-.085-.013.071ZM15.83 9.962c-.078.038-.047.167.093.41.1.173.179.376.23.595.047.208.05.613.005.821-.15.69-.557 1.184-1.245 1.518a3.043 3.043 0 0 1-1.273.306l-.303.01.18.143c.101.078.266.203.369.276.21.15.218.152.422.11a2.39 2.39 0 0 0 1.203-.664c.192-.188.252-.217.388-.188a.3.3 0 0 1 .208.412c-.03.07-.25.301-.42.437a3.01 3.01 0 0 1-.783.45l-.094.032.17.08c.244.113.502.196.65.207l.124.01.14-.134c.56-.54.923-1.297 1.054-2.202.046-.31.061-.803.036-1.065-.075-.752-.368-1.3-.821-1.525-.124-.062-.254-.077-.334-.039ZM10.361 10.296c.287.486.786 1.164 1.159 1.575l.08.09v-.158c0-.218-.03-.525-.061-.647-.063-.245-.239-.486-.486-.67a1.752 1.752 0 0 0-.698-.32l-.08-.016.086.146Z"
        fill="#CD1818"
      />
      <path
        d="m2.652 12.312-.063.01.097.05c.14.073.334.26.407.395.005.009.348-.174.348-.186a.729.729 0 0 0-.12-.09c-.206-.137-.483-.212-.669-.18ZM21.198 12.313a1.222 1.222 0 0 0-.554.268c0 .012.343.195.348.186.073-.135.266-.32.41-.398.067-.035.09-.056.067-.056-.02 0-.07-.003-.11-.006a.645.645 0 0 0-.161.006ZM2.213 12.68a.877.877 0 0 0 .027.48c.05.137.083.2.175.327l.058.08.072-.148a1.94 1.94 0 0 1 .16-.264.64.64 0 0 0 .088-.132c0-.036-.086-.15-.177-.23a.671.671 0 0 0-.233-.14 2.767 2.767 0 0 0-.143-.052.662.662 0 0 0-.027.08ZM21.695 12.655a.674.674 0 0 0-.226.138c-.09.081-.177.194-.177.23 0 .01.039.07.088.132.048.063.12.181.16.264l.072.148.058-.08c.15-.208.22-.391.223-.59.002-.125-.029-.297-.055-.294-.005 0-.07.024-.143.052ZM3.68 12.915c-.19.054-.355.155-.54.338-.149.148-.181.19-.25.33a1.463 1.463 0 0 0-.095.238c-.02.088-.025.338-.005.338a.334.334 0 0 0 .061-.093 1.14 1.14 0 0 1 .283-.316c.099-.075.256-.144.424-.192.188-.052.239-.076.34-.157a.822.822 0 0 0 .233-.348l.042-.113-.046-.02c-.075-.03-.34-.034-.446-.005ZM20.014 12.901c-.014.005-.042.017-.064.024l-.038.015.043.114c.056.147.14.272.233.347.1.081.152.105.339.157.168.048.325.117.424.192.106.078.233.222.283.316.027.051.054.093.063.093.019 0 .013-.25-.007-.338a1.461 1.461 0 0 0-.095-.237c-.069-.14-.1-.183-.25-.33-.188-.187-.353-.289-.55-.34a1.19 1.19 0 0 0-.38-.013ZM4.395 13.394a1.04 1.04 0 0 1-.445.423 1.646 1.646 0 0 1-.278.105 1.183 1.183 0 0 0-.187.063.757.757 0 0 0-.376.434l-.041.11.071.017a.673.673 0 0 0 .315.02c.399-.056.787-.373.95-.777a.992.992 0 0 0 .062-.429l-.012-.081-.06.115ZM19.617 13.367c-.05.432.303.948.78 1.138.193.076.36.088.549.04l.071-.016-.04-.11a.757.757 0 0 0-.377-.434 1.165 1.165 0 0 0-.187-.063 1.654 1.654 0 0 1-.278-.105 1.049 1.049 0 0 1-.446-.425l-.061-.117-.01.092Z"
        fill="#fff"
      />
      <path
        d="M8.924 19.776c-.145.044-.276.213-.346.445-.099.334.077.612.39.612.121 0 .193-.03.28-.117.165-.164.258-.505.192-.698-.065-.183-.32-.303-.516-.242Z"
        fill="#CD1818"
      />
    </svg>
  );
});

export const Delete = memo(function Delete({ title, titleId, width, height, ...props }: IconProps) {
  return (
    <svg
      width={width ?? '100%'}
      height={height ?? '100%'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      aria-labelledby={titleId ?? 'delete'}
      {...props}>
      <title id={titleId ?? 'delete'}>{title ?? 'Delete'}</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0003 15.8333C15.0003 16.2925 14.627 16.6666 14.167 16.6666H5.83366C5.37366 16.6666 5.00033 16.2925 5.00033 15.8333V6.66663H15.0003V15.8333ZM8.33366 3.60663C8.33366 3.47746 8.51199 3.33329 8.75032 3.33329H11.2503C11.4887 3.33329 11.667 3.47746 11.667 3.60663V4.99996H8.33366V3.60663ZM17.5003 4.99996H16.667H13.3337V3.60663C13.3337 2.53663 12.3995 1.66663 11.2503 1.66663H8.75033C7.60116 1.66663 6.66699 2.53663 6.66699 3.60663V4.99996H3.33366H2.50033C2.04199 4.99996 1.66699 5.37496 1.66699 5.83329C1.66699 6.29163 2.04199 6.66663 2.50033 6.66663H3.33366V15.8333C3.33366 17.2116 4.45533 18.3333 5.83366 18.3333H14.167C15.5453 18.3333 16.667 17.2116 16.667 15.8333V6.66663H17.5003C17.9587 6.66663 18.3337 6.29163 18.3337 5.83329C18.3337 5.37496 17.9587 4.99996 17.5003 4.99996V4.99996Z"
        fill="#CD1818"
      />
    </svg>
  );
});
