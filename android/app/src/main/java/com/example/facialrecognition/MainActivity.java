package com.example.facialrecognition;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {}

import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;

webView.setWebChromeClient(new WebChromeClient() {
  @Override
  public void onPermissionRequest(final PermissionRequest request) {
    request.grant(request.getResources());
  }
});

