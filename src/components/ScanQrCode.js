// Generation of QR Code in React Native
// https://aboutreact.com/generation-of-qr-code-in-react-native/
import axios from 'axios';
// import React in our code
import React, { useState, useRef,useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Share,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';

const ScanQrCode = () => {
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  let myQRCode = useRef(); 

  const shareQRCode = () => {
    myQRCode.toDataURL((dataURL) => {
      console.log(dataURL);
      let shareImageBase64 = {
        title: 'React Native',
        url: `data:image/png;base64,${dataURL}`,
        subject: 'Share Link', //  for email
      };
      Share.share(shareImageBase64).catch((error) => console.log(error));
    });
  };
  

    // console.log(`https://test/get/${selectedMonth}`);
    // axios.post('https://jsonplaceholder.typicode.com/payment-transaction/month', {
    //    userAccountNumber: accountNo,
    //    date: selectedMonth,
    // }).then(res => {
    //   setTransaction(
    //     res.data.map(tran => ({
    //       otherAccountNumber: tran.otherAccountNumber,
    // nameOther: tran.nameOther,
    // bankNameOther: tran.bankNameOther,
    // amount: tran.amount,
    // type: tran.type,
    // date: tran.date,
    // created_at: tran.created_at,
    // press: false,
    //     })),
    //   );
    // });
    


  //creat get api
  const fetchQr = () => {
    const baseUrl = 'https://server-quplus.herokuapp.com';
    // const acctoken = 'ABCDEF';
    const reftoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA2YTZmNDA5LTQyZDAtNDQ4MC1hMDg2LThiZmJiNTI5Y2IyNCIsImZpcnN0TmFtZSI6InRlc3QxIiwibWlkZGxlTmFtZSI6InQxIiwibGFzdE5hbWUiOiJUZXN0MSIsInRpbWVfc3RhbXAiOiIyMDIyLTExLTIyVDE5OjIwOjE1LjE4MloiLCJpYXQiOjE2NjkxNDQ4MTUsImV4cCI6MTY2OTc0OTYxNX0.oWlCdQ1eltE7-RR6Saa8Z-30SEwa3kNY6nZDH7mjKPo';
    axios.post(`${baseUrl}/api/auth/signin`, {}, {
      headers: {
        Authorization: `Bearer ${reftoken}`
    }
    }).then(response => {
      console.log('response.data.AcessToken',response.data.AcessToken)
    //  axios
    //         .get(
    //           // `https://server-quplus.herokuapp.com/api/user-payment/`,
    //           {
    //             headers: {Authorization: `Bearer ${response.data.AcessToken}`},
    //           },
    //         )
    //         .then(function (response) {
    //           console.log('user-payment', response.data);
         
    //         })
    //         .catch(function (error) {
    //           console.log('error user-payment', error.response.data);
    //         });
      axios
       .post(
        `https://server-quplus.herokuapp.com/api/user-payment/qr`,
        { 
          fee : 0,
        }, 
        { 
          headers: {Authorization: `Bearer ${response.data.AcessToken}`}, 
        },
      )
      .then(res => {
        console.log('then', res.data);
        setQrvalue(res.data.QRPayload);
      })
      .catch(err => {
        console.log('castch user-payment', err.response.data);
      });
    
    })
  };



// decrypt response = {
//     bankName: string;
//     accountName: string;
//     accountNumber: string;
//     ref: string;
//     amount: number;
//     fee: number;
//     type: string;
//     timeExpired: string;
// }




  useEffect(()=>{
    //fetch API
    fetchQr()
},[])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container} >
        <Text style={styles.titleStyle}>
          Generation of QR Code in React Native
        </Text>
        <QRCode
          getRef={(ref) => (myQRCode = ref)}
          // ref={myQRCode}
          //QR code value
          value={qrvalue ? qrvalue : 'NA'}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="black"
          //Background Color of the QR Code (Optional)
          backgroundColor="white"
          //Center Logo size  (Optional)
          logoSize={30}
          //Center Logo margin (Optional)
          logoMargin={2}
          //Center Logo radius (Optional)
          logoBorderRadius={15}
          //Center Logo background (Optional)
          logoBackgroundColor="yellow"
        />
        {/* <Text style={styles.textStyle}>
          Please insert any value to generate QR code
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(inputText) => setInputText(inputText)}
          placeholder="Enter Any Value"
          value={inputText}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setQrvalue(inputText)}>
          <Text style={styles.buttonTextStyle}>
            Generate QR Code
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={shareQRCode}>
          <Text style={styles.buttonTextStyle}>
            Share QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default ScanQrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 60,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});