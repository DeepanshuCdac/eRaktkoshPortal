import React from "react";
import '../scss/faq.scss'
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';

const text = [
    {
        text1: 'Kindly email your queries on eraktkosh@cdac.in'
    },
    {
        text2: 'Details about eRaktKosh are available at about eraktkosh page'
    },
    {
        text3: 'The blood stock can be searched at Stock availability page'
    },
    {
        text4: 'The details of camps can be found at Camp schedule page. Many camps also accept online pre-registration.'
    },
    {
        text5: 'Kindly fill the form Click here to fill to form'
    },
    {
        text6: 'Kindly Register your blood bank at Add your blood bank page'
    },
    {
        text7: 'The blood stock can be searched by default as Whole Blood at Stock availability page. You can change component type as Platelet then search again.'
    },
    {
        text8: 'Use eRaktkosh mobile App, enable the location, and then search nearest blood bank, then you can see distance wise list of blood banks.'
    },
    {
        text9: 'You can see last updated date or LIVE status into blood availability option.'
    },
    {
        text10: 'Minimum age for whole blood donation is 18 years in India. The maximum age for blood donation depends on the kind of donation.'
    },
    {
        text11: 'At google play store, you can search eraktkosh. Once installed, using GPS technology the app locate nearest blood bank along with blood availability.'
    },
    {
        text12: 'No. We do not take blood from anyone under the influence of alcohol. This is because being intoxicated can affect your ability to understand and answer the donor questionnaire and declaration.'
    },
    {
        text13: 'It depends on why you are taking the antibiotics and it may also depend after doctor counselling.'
    },
    {
        text14: 'There are no side effects of blood donation. The blood bank staff ensures that your blood donation is a good experience so as to make you a regular blood donor. There are a number of people who have donated more than 25-100 times in their entire lifetime.'
    },
    {
        text15: 'After every three –four months you can donate blood.'
    },
    {
        text16: 'Anything that you normally eat at home. Eating a light snacks and having a soft drink before blood donation is sufficient.'
    },
]
const getItems = (panelStyle) => [
    {
        key: '1',
        label: 'Whom should I contact in case of any problem ?',
        children: <p>{text[0].text1}</p>,
        style: panelStyle,
    },
    {
        key: '2',
        label: 'What is eRaktKosh ?',
        children: <p>{text[1].text2}</p>,
        style: panelStyle,
    },
    {
        key: '3',
        label: 'Where can I find latest blood stock from various blood banks ?',
        children: <p>{text[2].text3}</p>,
        style: panelStyle,
    },
    {
        key: '4',
        label: 'Where can I find details of camps being conducted by various blood banks ?',
        children: <p>{text[3].text4}</p>,
        style: panelStyle,
    },
    {
        key: '5',
        label: 'How can I onboard my blood bank to eRaktKosh ?',
        children: <p>{text[4].text5}</p>,
        style: panelStyle,
    },
    {
        key: '6',
        label: 'How to add your blood bank to eraktkosh ?',
        children: <p>{text[5].text6}</p>,
        style: panelStyle,
    },
    {
        key: '7',
        label: 'How to check Platelet unit in eraktkosh app?',
        children: <p>{text[6].text7}</p>,
        style: panelStyle,
    },
    {
        key: '8',
        label: 'How can i check the nearest blood bank from my current location?',
        children: <p>{text[7].text8}</p>,
        style: panelStyle,
    },
    {
        key: '9',
        label: 'How to verify blood unit is available or not on current date?',
        children: <p>{text[8].text9}</p>,
        style: panelStyle,
    },
    {
        key: '10',
        label: 'How does age affects my ability to donate blood?',
        children: <p>{text[9].text10}</p>,
        style: panelStyle,
    },
    {
        key: '11',
        label: 'Need Blood Immediately. Which app finds patients blood requirement as soon as possible ?',
        children: <p>{text[10].text11}</p>,
        style: panelStyle,
    },
    {
        key: '12',
        label: 'I had alcohol before going to donate blood. Is it Okay?',
        children: <p>{text[11].text12}</p>,
        style: panelStyle,
    },
    {
        key: '13',
        label: 'I am taking antibiotics. Can I donate blood?',
        children: <p>{text[12].text13}</p>,
        style: panelStyle,
    },
    {
        key: '14',
        label: 'Are there any side effects of Blood donations?',
        children: <p>{text[13].text14}</p>,
        style: panelStyle,
    },
    {
        key: '15',
        label: 'How often can I donate Blood ?',
        children: <p>{text[14].text15}</p>,
        style: panelStyle,
    },
    {
        key: '16',
        label: 'What should I eat before blood-donation ?',
        children: <p>{text[15].text16}</p>,
        style: panelStyle,
    },
];

const Faqs = () => {

    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div style={{position: 'relative'}}>
                      <h1 className="section-header">FAQ's</h1>
                      <div className="bdrBtm"></div>
                      </div>
                        <img style={{ width: '30px', height: '30px' }} src="assets/images/searchBtn.png" className="img-fluid" />
                    </div>

                    <Collapse
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        style={{
                            background: token.colorBgContainer,
                        }}
                        items={getItems(panelStyle)}
                    />

                </div>
            </div>
        </>
    )
}

export default Faqs