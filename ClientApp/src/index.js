import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter , Route, Switch, Redirect } from "react-router-dom";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
import Index from "views/Index.js";
import Landing from "views/pages/Landing.js";
import Login from "views/pages/Login.js";
import Profile from "views/pages/Profile.js";
import Register from "views/pages/Register.js";
import TanitimPage from "views/pages/TanitimPage.js";
import SunumPage from "views/pages/SunumPage";
import GonulluCalismaYonetmelikPage from "views/pages/GonulluCalismaYonetmelikPage";
import VizyonMisyonPage from "views/pages/VizyonMisyonPage";
import IzinlerimPage from "views/pages/IzinlerimPage";
import AvansPage from "views/pages/AvansPage";
import KurumsalKimlikKilavuzu from "views/pages/kurumsal_kimlik_kilavuzu";
import ResmiSenedi from "views/pages/ResmiSenedi";
import YonetimKurulu from "views/pages/YonetimKurulu";
import DataList1 from "views/pages/Datalist1";
import SantralTalepPage from "views/pages/SantralTalepPage"
import EntegrasyonPage from "views/pages/EntegrasyonPage"
import IzinTalepFormu from "views/pages/izinTalepFormu";
import MutevelliHeyeti from "views/pages/MutevelliHayeti";
import MesaiPage from "views/pages/MesaiPage";
import PersonelYonetmeligi from "views/pages/PersonelYonetmeligi";
import UcretlendirmeVeSosyalHaklar from "views/pages/UcretlendirmeVeSosyalHaklar";
import IKizinler from "views/pages/IKizinler";
import FazlaMesailer from "views/pages/FazlaMesailer";
import IseAlimIslemleri from "views/pages/IseAlimIslemleri";
import SaglikHizmetleri from "views/pages/SaglikHizmetleri";
import BorcParaIslemleri from "views/pages/BorcParaIslemleri";
import SeyahatAvansIslemleri from "views/pages/SeyahatAvansIslemleri"
import Yurtlar from "views/pages/Yurtlar";
import GenelMudurlukveSubeler from "views/pages/GenelMudurlukveSubeler";
import VakifResmiSenedi from "views/pages/VakifResmiSenedi";
import DenetimYonetmeligi from "views/pages/DenetimYonetmeligi";
import IhaleYonetmeligi from "views/pages/IhaleYonetmeligi";
import BagisToplamaveUsul from "views/pages/BagisToplamaveUsul";
import KiralamaYonetmeligi from "views/pages/KiralamaYonetmeligi";
import SubeVeTemsilcilikYonetmeligi from "views/pages/SubeVeTemsilcilikYonetmeligi";
import YurticiBursYonetmeligi from "views/pages/YurticiBursYonetmeligi";
import YurtdisiBursYonetmeligi from "views/pages/YurtdisiBursYonetmeligi";
import EtikDavranisKurallari from "views/pages/EtikDavranisKurallari";
import UzakCalismaP from "views/pages/UzakCalismaP";
import SeyahatveHarcigah from "views/pages/SeyahatveHarcigah";
import HediyeAlmaVermeYonetmeligi from "views/pages/HediyeAlmaVermeYonetmeligi";
import FelaketYonetmeligi from "views/pages/FelaketYonetmeligi";
import SosyalMedya from "views/pages/sosyal_medya";
import KuralSeti from "views/pages/kuralSeti";
import SiparisStatu from "views/pages/siparisStatuStandardi";
import KVKCalismaGrubuYonergesi from "views/pages/KVKCalismaGrubuYonergesi";
import Mevzuatlar from "views/pages/mevzuatlar";
import FaturaBilgisi from "views/pages/faturaBilgileri"
import VakifGirisCikis from "views/pages/VakifGirisCikis"
const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
    <Switch>
    <Route
        path="/EntegrasyonPage"
        exact
        render={(props)=> <EntegrasyonPage {...props} />}
      />
      <Route
        path="/login"
        exact
        render={(props) => <Login {...props} />}
      />

      <Route path="/" exact render={(props) => <Index {...props} />} />
      <Route
        path="/profil/"
        exact
        render={(props) => <Profile {...props} />}
      />

    <Route path ="/insanKaynaklari/vakifGirisCikis"
        exact
        render={(props)=> <VakifGirisCikis {...props} />}    
      />
      
      <Route path="/"
      exact
      render ={(props)=> <izinTalepFormu {...props} />}
      />


      <Route path ="/yonetmelik/hediyeKabul"
        exact
        render={(props)=> <hediyeKabul {...props} />}    
      />

    <Route path ="/yonetmelik/kvkcalismayonetmeligi"
        exact
        render={(props)=> <KVKCalismaGrubuYonergesi {...props} />}    
      />


      <Route
        path="/tanitim/"
        exact
        render={() => <TanitimPage />}
      />

      <Route 
      path="/mevzuatlar/hediyeAlmaVermeYonetmeligi/"
      exact
      render={() => <HediyeAlmaVermeYonetmeligi />}
      />

      <Route 
      path="/mevzuatlar/siparisStandardi/"
      exact 
      render={() => <SiparisStatu />}
      />

    <Route path ="/faturaBilgisi/"
        exact
        render={(props)=> <FaturaBilgisi {...props} />}    
      />

    <Route path ="/kutuphane/mevzuatlar/"
        exact
        render={(props)=> <Mevzuatlar {...props} />}    
      />

    <Route 
      path="/mevzuatlar/FelaketYonetmeligi/"
      exact
      render={() => <FelaketYonetmeligi />}
    />

    <Route 
      path="/mevzuatlar/kuralSeti/"
      exact
      render={() => <KuralSeti />}
      />



      <Route
        path="/kurumsal/sunum/"
        exact
        render={() => <SunumPage />}
      />
      <Route
        path="/hakkimizda/vizyon_misyon/"
        exact
        render={() => <VizyonMisyonPage />}
      />
      <Route
        path="/uygulamalar/mesailerim/"
        exact
        render={() => <MesaiPage />}
      />
       <Route
        path="/hakkimizda/yonetim_kurulu/"
        exact
        render={() => <YonetimKurulu />}
      />
      <Route
        path="/hakkimizda/mutevelli_heyeti/"
        exact
        render={() => <MutevelliHeyeti />}
      />
      <Route
        path="/uygulamalar/izinlerim/"
        exact
        render={() => <IzinlerimPage />}
      />
      <Route
        path="/veri/datalist1"
        exact
        render={() => <DataList1 />}
      />
      
      <Route
        path="/uygulamalar/avanslarim/"
        exact
        render={(props) => <AvansPage {...props} />}
        />
      <Route
        path="/kurumsal/gonullu_calisma_yonetmeligi/"
        exact
        render={(props) => <GonulluCalismaYonetmelikPage {...props} />}
      />
      <Route
        path="/kurumsal/kurumsal_kimlik_kilavuzu/"
        exact
        render={(props) => <KurumsalKimlikKilavuzu {...props} />}
      />
      <Route
        path="/yonetmelik/vakif_resmi_senedi/"
        exact
        render={(props) => <ResmiSenedi {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={(props) => <Register {...props} />}
      />
       <Route
        path="/yonetmelik/personel_yonetmeligi/"
        exact
        render={(props) => <PersonelYonetmeligi {...props} />}
      />
      <Route path="/izinTalepFormu"
      exact
      render={(props) => <IzinTalepFormu {...props} />}
      />

      <Route
        path="/uygulamalar/SantralTalepPage/"
        exact
        render={(props)=> <SantralTalepPage {...props} />}    
      />

    <Route
      path="/insanKaynaklari/UcretlendirmeVeSosyalHaklar/"
      exact
      render={(props) => <UcretlendirmeVeSosyalHaklar {...props} />}
    />


      <Route
        path="/insanKaynaklari/izinler/"
        exact
        render={(props)=> <IKizinler {...props} />}    
      />

        <Route
        path="/insanKaynaklari/FazlaMesailer/"
        exact
        render={(props)=> <FazlaMesailer {...props} />}    
      />

      <Route path ="/insanKaynaklari/IseAlimIslemleri/"
        exact
        render={(props)=> <IseAlimIslemleri {...props} />}    
      />

      <Route path ="/insanKaynaklari/SaglikHizmetleri/"
        exact
        render={(props)=> <SaglikHizmetleri {...props} />}    
        />

      <Route path ="/uygulamalar/borc_para_islemleri"
        exact
        render={(props)=> <BorcParaIslemleri {...props} />}    
      />

        <Route path ="/uygulamalar/seyahat_avans_islemlerim"
        exact
        render={(props)=> <SeyahatAvansIslemleri {...props} />}    
      />

      <Route path ="/yurtlar"
        exact
        render={(props)=> <Yurtlar {...props} />}    
      />

      <Route path ="/genel_muduruluk_subeler"
        exact
        render={(props)=> <GenelMudurlukveSubeler {...props} />}    
      />

        <Route path ="/yonetmelik/vakif_resmi_senedi"
        exact
        render={(props)=> <VakifResmiSenedi {...props} />}    
      />

      <Route path ="/yonetmelik/denetim_yonetmeligi"
        exact
        render={(props)=> <DenetimYonetmeligi {...props} />}    
      />

      <Route path ="/yonetmelik/tasinir_mal_hizmet_alim_ihale_yonetmeligi"
        exact
        render={(props)=> <IhaleYonetmeligi {...props} />}    
      />
        <Route path ="/yonetmelik/bagis_toplama_usul_esaslari"
        exact
        render={(props)=> <BagisToplamaveUsul {...props} />}    
      />  

      <Route path ="/yonetmelik/kiralama_yonetmeligi"
        exact
        render={(props)=> <KiralamaYonetmeligi {...props} />}    
      />

      <Route path ="/yonetmelik/sube_yonetmeligi"
        exact
        render={(props)=> <SubeVeTemsilcilikYonetmeligi {...props} />}    
      />
      
      <Route path ="/yonetmelik/yurtici_burs_yonetmeligi"
        exact
        render={(props)=> <YurticiBursYonetmeligi {...props} />}    
      />

      
    <Route path ="/yonetmelik/etik_davranis_kurallari"
        exact
        render={(props)=> <EtikDavranisKurallari {...props} />}    
      />

      <Route path ="/yonetmelik/yurtdisi_burs_yonetmeligi"
        exact
        render={(props)=> <YurtdisiBursYonetmeligi {...props} />}    
      />

      <Route path ="/mevzuatlar/uzaktan_calisma"
        exact
        render={(props)=> <UzakCalismaP {...props} />}    
      />

      <Route path ="/mevzuatlar/seyahat_harcigah"
        exact
        render={(props)=> <SeyahatveHarcigah {...props} />}    
      />

<Route
      path="/mevzuatlar/sosyal_medya/"
      exact
      render={(props) => <SosyalMedya {...props} />}
    />

      <Redirect to ="/login"/>


    </Switch>
  </BrowserRouter>
);
