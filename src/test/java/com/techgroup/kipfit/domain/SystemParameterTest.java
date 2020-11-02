package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class SystemParameterTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SystemParameter.class);
        SystemParameter systemParameter1 = new SystemParameter();
        systemParameter1.setId(1L);
        SystemParameter systemParameter2 = new SystemParameter();
        systemParameter2.setId(systemParameter1.getId());
        assertThat(systemParameter1).isEqualTo(systemParameter2);
        systemParameter2.setId(2L);
        assertThat(systemParameter1).isNotEqualTo(systemParameter2);
        systemParameter1.setId(null);
        assertThat(systemParameter1).isNotEqualTo(systemParameter2);
    }
}
