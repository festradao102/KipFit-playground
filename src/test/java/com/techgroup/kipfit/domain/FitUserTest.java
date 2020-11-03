package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class FitUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FitUser.class);
        FitUser fitUser1 = new FitUser();
        fitUser1.setId(1L);
        FitUser fitUser2 = new FitUser();
        fitUser2.setId(fitUser1.getId());
        assertThat(fitUser1).isEqualTo(fitUser2);
        fitUser2.setId(2L);
        assertThat(fitUser1).isNotEqualTo(fitUser2);
        fitUser1.setId(null);
        assertThat(fitUser1).isNotEqualTo(fitUser2);
    }
}
