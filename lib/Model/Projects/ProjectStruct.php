<?php

class Projects_ProjectStruct extends DataAccess_AbstractDaoSilentStruct implements DataAccess_IDaoStruct {

    public $id ;
    public $password ;
    public $id_customer ;
    public $create_date ;
    public $id_engine_tm ;
    public $id_engine_mt ;
    public $status_analysis ;
    public $fast_analysis_wc ;
    public $standard_analysis_wc ;
    public $remote_ip_address ;
    public $for_debug ;
    public $pretranslate_100 ;

    public function getOwnerFeature( $feature_code ) {
      return OwnerFeatures_OwnerFeatureDao::getByOwnerEmailAndCode(
        $feature_code, $this->id_customer
      );
    }

    public function isFeatureEnabled( $feature_code ) {
      Log::doLog( 'isFeatureEnabled', $feature_code);
      return $this->getOwnerFeature( $feature_code ) !== false ;
    }
}
