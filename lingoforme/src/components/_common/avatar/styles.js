import styled from 'styled-components';

export const Avatar = styled.div`
display: flex;
flex-direction: row;
padding-top: 4px;
color: #fff;

.personal-data{
    font-size:14px;
    padding-top:4px;
}

.personal-data > h3 {
    font-weight: 700;
}
img {
    height: 60px;
    border-radius:100%;
}
`