import React from 'react'
import {
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font
} from "@react-pdf/renderer";

const PdfPage = ({ data, qrcode }) => {

  Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
  });

  const styles_page = StyleSheet.create({
    title: {
      fontFamily: 'Roboto',
      justifyContent:'center',
      alignItems:'center'
    }
  })

  return (
    <Page orientation='landscape' size='A4' style={styles_page.title}>
      <View style={{ display: 'flex', flexDirection: 'column', width: '90%', height: '90%' }}>
        <View style={styles.mainView1}>
          <View style={styles.innerView}>
            <View style={{flexDirection:'column',alignItems:'center',marginBottom:40}}>
              <Text style={{fontSize:25}}>{data.Номенклатура.split('.')[1].split(',')[0]}</Text>
              <Text style={{fontSize:25}}>{data.Номенклатура.split('.')[0].split(' ')[0] + ' (' + data.Номенклатура.split('.')[2] + ' )'}</Text>
            </View>
            <View style={{marginTop:40}}>
              <Text style={styles.text1}>{data.GTIN}</Text>
            </View>
          </View>
          <View style={styles.innerView}>
            <View style={{ width: 230, height: 230, }}>
              <Image alt = "" source={{ uri: qrcode }} />
            </View>
          </View>
        </View>

        <View style={styles.mainView2}>
          <View>
            <Text style={styles.text2}>{`(${data.КодМаркировки.substr(0,2)})${data.КодМаркировки.substr(2,14)}(${data.КодМаркировки.substr(16,2)})${data.КодМаркировки.substr(18,13)}`}</Text>
          </View>
        </View>
      </View>
    </Page >
  )
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text2: {
    fontSize:20,
  },
  mainView1: {
    flex: 1,
    display:'flex',
    flexDirection:'row'
  },
  mainView2:{
    flex:0.3,
    display:'flex',
    justifyContent:'flex-end',
    flexDirection:'row'
    
  },
  innerView:{
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  text1:{
    fontSize:40,
    fontWeight:'bold'
  }
});

export default PdfPage
